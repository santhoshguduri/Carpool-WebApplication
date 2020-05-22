using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ResponseModels
{
    public class ProfileDetails
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobileno { get; set; }
        public string Gender { get; set; }
        public string Username { get; set; }
    }
}
