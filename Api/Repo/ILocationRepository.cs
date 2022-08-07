using Api.Models;

namespace Api.Repo
{
    public interface ILocationRepository
    {
        List<Location> GetLocations();
        Location GetById(int id);
        void insert(Location location);
        void update(Location location);
        void delete(int id);
    }
}
