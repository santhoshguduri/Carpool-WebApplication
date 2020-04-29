using System;
using System.Collections.Generic;
using System.Text;

namespace Models.RequestModels
{
    public class RequestBooking
    {
        public string StartPoint { get; set; }

        public string Destination { get; set; }

        public int Seats { get; set; }

        public DateTime RideBookingDate { get; set; }

        public string Time { get; set; }
    }
}
