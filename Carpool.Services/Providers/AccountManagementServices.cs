using AutoMapper;
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

        private readonly IMapper _mapper;

        public AccountManagementServices(IRepositoryManager<User> repository, IMapper mapper)
        {
            _repository = repository;

            _mapper = mapper;
        }

        public void UpdateUser(User user)
        {
            _repository.Put(user);
        }

        public void CreateNewUser(User user)
        {
            _repository.Post(user);
        }

        public ProfileDetails GetUserDetails(long id)
        {
            User user = _repository.Get(id);
            ProfileDetails profileDetails = _mapper.Map<User, ProfileDetails>(user);
            return profileDetails;
        }
    }
}
