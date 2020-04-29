using System;
using System.Collections.Generic;
using System.Text;
using Models.DataModels;

namespace Models.ResponseModels
{
    public class RideDetails
    {
        public long RideOfferId { get; set; }

        public string Name { get; set; }

        public string StartPoint { get; set; }

        public string Destination { get; set; }

        public string RideDate { get; set; }

        public string RideTime { get; set; }

        public double Price { get; set; }

        public int SeatsAvailable { get; set; }

        public BookingStatus Status { get; set; }
    }
}
