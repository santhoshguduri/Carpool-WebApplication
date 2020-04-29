using Models.DataModels;
using Models.ResponseModels;
using Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Services
{
    public class AccountManagementServices : IAccountManagementServices
    {
        private readonly IRepositoryManager<User> _repository;

        public AccountManagementServices(IRepositoryManager<User> repository)
        {
            _repository = repository;
        }

        public void UpdateUser(User user)
        {
            _repository.Put(user);
        }

        public void CreateNewUser(User user)
        {
            string Email = user.Email;
            string[] Username = Email.Split("@");
            user.Username = Username[0];
            _repository.Post(user);
        }

        public ProfileDetails GetUserDetails(long id)
        {
            User user = _repository.Get(id);
            ProfileDetails profileDetails = new ProfileDetails()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Gender = user.Gender,
                Mobileno = user.Mobileno
            };
            return profileDetails;

        }
    }
}
