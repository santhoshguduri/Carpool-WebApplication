using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ResponseModels
{
    public class BookingResponse
    {
        public long BookingId { get; set; }

        public string Name { get; set; }

        public string StartPoint { get; set; }

        public string Destination { get; set; }

        public string RideDate { get; set; }

        public string RideTime { get; set; }

        public double Price { get; set; }

        public int SeatsAvailable { get; set; }
    }
}
