using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Tests.SampleData
{
    internal class SampleUserTestData
    {
        public User GetSampleUser()
        {
            User TestUser = new User()
            {
                Id = 19,
                Username = "santhu",
                Email = "santhu@gmail.com",
                Gender = "male",
                Mobileno = "8484651623",
                Name = "santhu",
                Password = "santhu",
                LastOfferRideId = 15
            };
            return TestUser;
        }

        public List<User> GetSampleUsers()
        {
            List<User> users = new List<User>()
            {
                new User
                {
                    Id = 19,
                    Username = "santhu",
                    Email = "santhu@gmail.com",
                    Gender = "male",
                    Mobileno = "8484651623",
                    Name = "santhu",
                    Password = "santhu",
                    LastOfferRideId = 15
                },
                new User
                {
                    Id = 20,
                    Username = "naveen",
                    Email = "naveen@gmail.com",
                    Gender = "male",
                    Mobileno = "8484651623",
                    Name = "naveen",
                    Password = "naveen",
                    LastOfferRideId = 16
                }
            };
            return users;
        }
    }
}
