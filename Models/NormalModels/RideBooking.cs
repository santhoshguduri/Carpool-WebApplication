using System;
using System.Collections.Generic;
using System.Text;

namespace Models.RequestModels
{
    public class RideBooking
    {
        public string StartPoint { get; set; }
        public int Seats { get; set; }
        public string Destination { get; set; }
        public DateTime RideBookingDate { get; set; }
        public string Time { get; set; }
        public double RideFair { get; set; }
        public long BookingUserId { get; set; }
        public long RideOfferId { get; set; }
    }
}
