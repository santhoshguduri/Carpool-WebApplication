using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Tests.SampleData
{
    internal class SampleRouteTestData
    {
        public List<Place> GetSamplePlacesList()
        {
            List<Place> places = new List<Place>()
            {
                new Place
                {
                    AreaId=1,
                    AreaName="Ashoknagar",
                    RideOfferId=20
                },
                new Place
                {
                    AreaId=3,
                    AreaName="Sircilla",
                    RideOfferId=20
                },
                new Place
                {
                    AreaId=2,
                    AreaName="Venkampet",
                    RideOfferId=20
                },
                new Place
                {
                    AreaId=4,
                    AreaName="Delhi",
                    RideOfferId=10
                },
                new Place
                {
                    AreaId=3,
                    AreaName="Mumbai",
                    RideOfferId=10
                }
            };
            return places;
        }
    }
}
