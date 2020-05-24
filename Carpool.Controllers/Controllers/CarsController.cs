using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataProvider.Data;
using Models.DataModels;
using Carpool.Services;
using Microsoft.AspNetCore.Authorization;

namespace CarpoolApplication.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarServices _service;

        public CarsController(ICarServices service)
        {
            _service = service;
        }
        [HttpGet("{id}")]
        public long CheckIfOwnsCar([FromRoute]long id)
        {
            return _service.CheckIfOwnsCar(id);
        }

        [HttpPost]
        public void CreateCar([FromBody]Car car)
        {
            _service.CreateCar(car);
        }

        [HttpDelete]
        public void DeleteCar(long id)
        {
            _service.DeleteCar(id);
        }
    }
}
