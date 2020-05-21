using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DataModels;
using Models.RequestModels;
using Models.ResponseModels;

namespace Carpool.Services
{
    public interface IOfferRideService
    {

        void CreateRideOffer(long id,RideOffer rideOffer);

        List<RideDetails> GetAllRidesOffered(long userId);
    }
}
