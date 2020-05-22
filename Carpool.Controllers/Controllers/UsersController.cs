using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataProvider.Data;
using Models.DataModels;
using Models.ResponseModels;
using Carpool.Services;
using Microsoft.AspNetCore.Authorization;

namespace CarpoolApplication.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAccountManagementServices _service;

        private readonly IUserAuthenticationService _authService;

        public UsersController(IAccountManagementServices service,IUserAuthenticationService authService)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public bool CheckIsUnique(string username)
        {
            return _authService.CheckIsUnique(username);
        }

        [HttpGet]
        public UserDetails Authenticate([FromQuery]string userName, [FromQuery]string password)
        {
            return _authService.Authenticate(userName, password);
        }

        [Authorize]
        [HttpGet("{userId}")]
        public LastActionKeys GetLastActionsKeys([FromRoute]long userId)
        {
            return _authService.GetLastActionIds(userId);
        }

        [HttpGet("{id}")]
        public ProfileDetails GetUser(long id)
        {
            ProfileDetails user =  _service.GetUserDetails(id);

            return user;
        }

        [HttpPut]
        public void UpdateUser(User user)
        {
            _service.UpdateUser(user);
        }

        [HttpPost]
        public void CreateUser([FromBody]User user)
        {
            _service.CreateNewUser(user);
        }


    }
}
