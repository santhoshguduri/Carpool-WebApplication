using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataModels
{
    public class OfferRide
    {
        [Key]
        public long RideOfferId { get; set; }

        public List<Place> Route = new List<Place>();

        public int AvailableSeats { get; set; }

        public DateTime RideOfferedDate { get; set; }

        public string Time { get; set; }

        public long CarId { get; set; }

        public long HostId { get; set; }

        public List<Booking> Bookings = new List<Booking>();
    }
}
