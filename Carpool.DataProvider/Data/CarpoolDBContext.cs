using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models.DataModels;


namespace DataProvider.Data
{
    public class CarpoolDBContext : DbContext
    {
        public CarpoolDBContext(DbContextOptions<CarpoolDBContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<OfferRide> RidesOffered { get; set; }
        public DbSet<Place> Areas { get; set; }
        
    }
}
