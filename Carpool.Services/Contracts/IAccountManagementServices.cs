using Models.DataModels;
using Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Services
{
    public interface IAccountManagementServices
    {
        void CreateNewUser(User user);

        void UpdateUser(User user);

        ProfileDetails GetUserDetails(long id);
    }
}
