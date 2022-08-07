using Api.Models;

namespace Api.Repo
{
    public class LocationRepository : ILocationRepository
    {
        private readonly LocationContext _context;

        public LocationRepository(LocationContext context)
        {
            _context = context;
        }

        public void delete(int id)
        {
            _context.locations.Remove(_context.locations.Find(id));
        }

        public Location GetById(int id)
        {
            return _context.locations.Find(id);
        }

        public List<Location> GetLocations()
        {
            return _context.locations.ToList();
        }

        public void insert(Location location)
        {
            throw new NotImplementedException();
        }

        public void update(Location location)
        {
            _context.Entry(location).State = EntityState.Modified;
        }
    }
}
