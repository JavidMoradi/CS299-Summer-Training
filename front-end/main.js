import "ol/ol.css";
import Draw from "ol/interaction/Draw";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat, get } from "ol/proj";
import Swal from "sweetalert2";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import { Modify, Snap } from "ol/interaction";

const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource({ wrapX: false });

const vector = new VectorLayer({
  source: source,
});

const map = new Map({
  layers: [raster, vector],
  target: "map",
  view: new View({
    center: fromLonLat([35.22, 39.05]),
    zoom: 7,
  }),
});

var jpanel;
var btnClicked = false;
document.getElementById("addBtn").addEventListener("click", () => {
  btnClicked = !btnClicked;

  if (!btnClicked) {
    map.removeInteraction(draw);

    return;
  }

  addInteraction();

  let coord;
  draw.on("drawstart", (e) => {
    if (!btnClicked) return;

    coord = ol.proj.transform(e.target.sketchCoords_, "EPSG:3857", "EPSG:4326");
  });

  draw.on("drawend", () => {
    map.removeInteraction(draw);
    btnClicked = false;

    let element =
      '<label for="addname" style="font-size: 24px; margin-left: .2cm; margin-top: .1cm;"><b>Add Name</b>: </label>' +
      '<input type="text" id="addname" style="margin-left: .1cm; margin-bottom: .1cm; margin-right: .2cm; border-radius: .2cm;"><br>' +
      '<button type="button" class="btn btn-secondary" style="float: right; margin-right: .2cm; margin-bottom: .2cm;" onclick="postFunc(addname.value,' +
      coord[0] +
      ", " +
      coord[1] +
      ')">Submit</button>';

    jpanel = jsPanel.create({
      id: "addpanel",
      theme: "secondary",
      content:
        "<h style='font-size: 24px; margin-left: .2cm;'><b>x</b>: " +
        coord[0] +
        "</h><br><h style='font-size: 24px; margin-left: .2cm;'><b>y</b>: " +
        coord[1] +
        "</h><br>" +
        element,
      contentSize: "auto",
      headerTitle: "Selected Coordinates",
      borderRadius: ".5rem",
      animateIn: "jsPanelFadeIn",
      animateOut: "jsPanelFadeOut",
    });
  });
});

window.onload = () => {
  map.addInteraction(new Modify({ source: source }));

  fetch("https://localhost:7064/Location")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.length) return;

      let allfeatures = [];
      data.forEach((d) => {
        allfeatures.push(
          new Feature({
            geometry: new Point(
              ol.proj.transform([d.x, d.y], "EPSG:4326", "EPSG:3857")
            ),
          })
        );
      });

      const style = new Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new Fill({
            color: "red",
          }),
        }),
      });

      let s = new VectorSource({ wrapX: false, features: allfeatures });
      let v = new VectorLayer({
        source: s,
        style: style,
      });

      map.addLayer(v);

      map.addInteraction(new Modify({ source: s }));
    });
};

document.getElementById("showLBtn").addEventListener("click", showAllLFunc);
function showAllLFunc() {
  fetch("https://localhost:7064/Location")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let htmlContent = "";
      htmlContent = htmlContent.concat(
        '<table id="locationsTable" class="display" style="width:100%"><thead><tr><th>Name</th><th>X</th><th>Y</th></tr></thead>'
      );

      htmlContent = htmlContent.concat("<tbody>");
      data.forEach((d) => {
        let tempx = d.x.toString(),
          tempy = d.y.toString();
        if (!tempx.includes(".")) {
          tempx += ".00";
        } else {
          tempx += "00";
        }
        if (!tempy.includes(".")) {
          tempy += ".00";
        } else {
          tempy += "00";
        }

        tempx = tempx.substring(0, tempx.indexOf(".") + 3);
        tempy = tempy.substring(0, tempy.indexOf(".") + 3);

        htmlContent = htmlContent.concat(
          '<tr id="' +
            d.id +
            '">' +
            "<td>" +
            d.name +
            "</td>" +
            "<td>" +
            tempx +
            "</td>" +
            "<td>" +
            tempy +
            "</td>" +
            '<td><button type="button" class="btn btn-outline-warning" onclick="updateFunc(' +
            d.id +
            ')">Update</button></td>' +
            '<td><button type="button" class="btn btn-outline-danger" onclick="delFunc(' +
            d.id +
            ')">Delete</button></td>' +
            "</tr>"
        );
      });
      htmlContent = htmlContent.concat("</tbody></table>");

      Swal.fire({
        title: "Locations",
        html: htmlContent,
        confirmButtonText: "Close",
      });
    });
}

var draw;
function addInteraction() {
  draw = new Draw({
    source: source,
    type: "Point",
  });

  map.addInteraction(draw);
}

function postFunc(name, x_prime, y_prime) {
  if (name.length < 3) {
    Swal.fire({
      html: "<b>POST operation halted!</b> <br>An error occurred during POST operation.",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top",
      padding: "1em",
    });

    return;
  }

  fetch("https://localhost:7064/location/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      x: x_prime,
      y: y_prime,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then(
      Swal.fire({
        html: "POST operation completed <b>successfully</b>!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: "top",
        padding: "1em",
      }),

      jpanel.close("addpanel"),

      setTimeout(() => {
        location.reload();
      }, 3500)
    );
}
window.postFunc = postFunc;

function delFunc(delID) {
  fetch("https://localhost:7064/Location/del/" + delID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("delete success");
      } else {
        console.log("delete fail");
      }

      return res.json();
    })
    .then(showAllLFunc);
}
window.delFunc = delFunc;

async function updateFunc(locID) {
  const { value: formValues } = await Swal.fire({
    title: "Please Provide New Name for the Location",
    html: '<input id="swal-input2" class="swal2-input" placeholder="New Name">',
    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById("swal-input2").value];
    },
  });

  if (formValues[0].length < 3) {
    Swal.fire({
      html: "New Name's Length Should be at least 3 Characters Long!",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: "top",
      padding: "1em",
    });

    return;
  }

  fetch("https://localhost:7064/Location", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: locID,
      name: formValues[0],
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then(showAllLFunc);
}
window.updateFunc = updateFunc;
