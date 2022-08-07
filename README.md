# Bilkent CS299 Summer Training
A Geographical Full-Stack Interactable Web-Based application, where a user can add a point on map, update and delete an existing point on the map, or display a list of existing points of the map. This internship was done as a part of Bilkent University's mandatory Summer Training/Internship programme. Internship was done at Başarsoft Bilgi Teknolojileri corp.

Used Technologies
===
- OpenLayers
- .Net 6
- Vanilla JavaScript
- HTML/CSS
- PostgreSQL

How to Run
===
- On **Api/appsettings.json**, provide your PostgreSQL's DataBase name, User Id, and Password, along with the Port number spared for it.
  - You can find and alter the Port number on **Api/Properties/launchSettings.json** file.
- Later, simply run the project to activate the Back-End functionality of the project. It is strongly recommended to use the Visual Studio when running the project.
- To install OpenLayers, provide the **npm install ol** on your terminal. Then, simply type **npm start** on your terminal, which you'll be redirected to your web browser and display the map, on the Port number 3000.
  - For any OpenLayers related question, please refer to their [website](https://openlayers.org/).
