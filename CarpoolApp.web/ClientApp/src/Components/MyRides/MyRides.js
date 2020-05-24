import React,{  useEffect, useContext } from "react"
import MatchedUser from '../MatchedUser/MatchedUsers';
import { getAllBookings } from "../../Services/RideBookingServices";
import { getAllRidesOffered } from "../../Services/RideOfferingServices";
import { BookingContext } from "../../Store/Context/BookingContext";
import { RideContext } from "../../Store/Context/RidesContext";

function MyRides() {    

    const bookingContext = useContext(BookingContext);

    const rideContext = useContext(RideContext);

    useEffect(() => {
        console.log(bookingContext.bookingDispatch);
        getAllBookings(bookingContext.bookingDispatch);
        getAllRidesOffered(rideContext.rideDispatch);
    },[]);

        console.log(bookingContext.bookingState);
        return(
            <div className="appBackground">
                <div id="bookedRides">
                <p id="bookedRide-header">Booked rides</p>
                {bookingContext.bookingState.rides.map((booking)=>(
                    <MatchedUser ride={booking} />
                ))}
                </div>
                <div id="offeredRides">
                <p id="offeredRide-header">Offered rides</p>
                {rideContext.rideState.rides.map((ride)=>(
                    <MatchedUser ride={ride}/>
                ))
                    }
                </div>
            </div>
        )
}


export default MyRides;