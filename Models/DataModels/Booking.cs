using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataModels
{
    public enum BookingStatus { None ,Approved = 1 , Rejected, Requested}
    public class Booking
    {
        [Key]
        public long Id { get; set; }
        public string StartPoint { get; set; }
        public int Seats { get; set; }
        public string Destination { get; set; }
        public DateTime RideBookingDate { get; set; }
        public string Time { get; set; }
        public double RideFair { get; set; }
        public long BookingUserId { get; set; }
        public long RideOfferId { get; set; }
        public BookingStatus Status { get; set; } = 0;
    }
}
