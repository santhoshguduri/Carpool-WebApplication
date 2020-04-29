﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DataModels
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobileno { get; set; }
        public string Gender { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } 
        public long LastOfferRideId { get; set; }
        public long LastBookingId { get; set; }
    }
}
