using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Api.Models;

namespace Api.Data;

public class LocationContext : DbContext
{
    public LocationContext(DbContextOptions<LocationContext> options) : base(options) { }

    public DbSet<Location> locations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // modelBuilder.Entity<Location>().HasData(new Location { id = 20, name = "temp data", x = 12.3, y = 56.7 });
        // modelBuilder.Entity<Location>().HasData(new Location { id = 21, name = "dummy data", x = 16.4, y = 83.1 });
        // modelBuilder.Entity<Location>().HasData(new Location { id = 22, name = "void data", x = 65.43, y = 4 });
        // modelBuilder.Entity<Location>().HasData(new Location { id = 23, name = "valid data", x = 134.99, y = 88.1 });
    }
}
