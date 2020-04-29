using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataProvider.Data;
using Models.RequestModels;
using Carpool.Services;
using Models.ResponseModels;

namespace CarpoolApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class OfferRidesController : ControllerBase
    {
        private readonly IOfferRideService _service;

        public OfferRidesController(IOfferRideService service)
        {
            _service = service;
        }

        [HttpPost("{userId}")]
        public void CreateRide([FromRoute]long userId, [FromBody]RideOffer rideOffer)
        {
            _service.CreateRideOffer(userId,rideOffer);
        }

        [HttpGet("{userId}")]
        public List<RideDetails> GetAllRidesOffered([FromRoute]long userId)
        {
            return _service.GetAllRidesOffered(userId);
        }
        
    }
}
