using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Data;

using Npgsql;
using System.Data;

using Api.Controllers;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class LocationController : ControllerBase
{
    private readonly LocationContext locationContext;

    public LocationController(LocationContext locationContext)
    {
        this.locationContext = locationContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Location>>> GetAll()
    {
        return Ok(await locationContext.locations.ToListAsync());
    }

    [HttpPost("post")]
    public async Task<ActionResult<List<Location>>> Add(Location loc)
    {
        string _out = ErrorController.NullValueField(loc, nameof(Add));
        if (!_out.Equals(string.Empty))
        {
            return Content(_out);
        }

        locationContext.locations.Add(loc);

        await locationContext.SaveChangesAsync();

        return Ok(await locationContext.locations.ToListAsync());
    }

    [HttpDelete("del/{id}")]
    public async Task<ActionResult<List<Location>>> DeleteItem([FromRoute] long id)
    {
        var _temp = await locationContext.locations.FindAsync(id);
        if (_temp == null)
        {
            return Content(ErrorController.NotFound(id));
        }

        locationContext.locations.Remove(_temp);

        await locationContext.SaveChangesAsync();

        return Ok(await locationContext.locations.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<List<Location>>> UpdateList(Location newLocation)
    {
        var _data = await locationContext.locations.FindAsync(newLocation.id);
        if (_data == null)
        {
            return Content(ErrorController.DNE(newLocation.id));
        }
        else if (newLocation.name.Equals(string.Empty))
        {
            return Content(ErrorController.NullValueField(newLocation, nameof(UpdateList)));
        }

        _data.name = newLocation.name;

        await locationContext.SaveChangesAsync();

        return Ok(await locationContext.locations.ToListAsync());
    }

    [HttpGet("temp/{id}")]
    public async Task<ActionResult<Location>> GetWithID([FromRoute] long id)
    {
        var _temp = await locationContext.locations.FindAsync(id);
        if (_temp == null)
        {
            return Content(ErrorController.NotFound(id));
        }

        return Ok(_temp);
    }
}
