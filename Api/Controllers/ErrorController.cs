using Microsoft.AspNetCore.Mvc;

using Api.Models;

namespace Api.Controllers;

public class ErrorController
{
    public static string NotFound(long id)
    {
        return "Query with an id of \"" + id + "\" not found.\nPlease provide valid id.";
    }

    public static string DNE(long id)
    {
        return "Query with an id of \"" + id + "\" does not exists.\nPlease provide valid id.";
    }

    public static string NullValueField(Location loc, string MethodName)
    {
        string str = "";
        if (loc.name.Equals(string.Empty))
        {
            str += "\"name\" is left blank!\n";
        }
        if (MethodName.ToLower().Equals("add"))
        {
            if (loc.x == 0)
            {
                str += "\"x\" is left blank!\n";
            }
            if (loc.y == 0)
            {
                str += "\"y\" is left blank!\n";
            }
        }
        
        return str;
    }

    
}
