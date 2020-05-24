import React,{ useState, useEffect, useContext } from "react";
import { getBookingRequests, setBookingStatus } from "../../Services/RideBookingServices";
import MatchedUser from "../MatchedUser/MatchedUsers";
import { BookingContext } from "../../Store/Context/BookingContext";


function BookingRequests() {

    const [booking,setBooking] = useState(
        {
            bookingId:0,
            Status :{
                Accepted:1,
                Rejected:2
            }
        }
    );

        const bookingContext = useContext(BookingContext);

    useEffect(() =>{ 
        getBookingRequests(bookingContext.bookingDispatch);
       },[] )

    const handleOnClick =(Id)=>{
        console.log(Id);
        setBooking({...booking,
            bookingId : Number(Id)
        });
        document.getElementById('confirmation').style.display="block";
    }

    const handleAccept =()=>{
        setBookingStatus(booking.bookingId,booking.Status.Accepted);
    }

    const handleReject =()=>{
        setBookingStatus(booking.bookingId,booking.Status.Rejected);
    }

        return(
            <div className="appBackground">
                <div id="bookedRequests">
                    {bookingContext.bookingState.rides.length != 0?
                        <h3>Booking Requests</h3> : <React.Fragment></React.Fragment>}
                    {
                        bookingContext.bookingState.rides.map((ride) =>(
                            <div onClick={()=>handleOnClick(ride.id)} id="request">
                            <MatchedUser ride={ride}/>
                            </div>
                        ))
                    }
                    {
                        bookingContext.bookingState.rides.length == 0?
                        <h4>No pending booking requests</h4> : <React.Fragment></React.Fragment>
                    }
                    <div id="confirmation">
                        <h4>Do you want to accept the booking request ?</h4>
                        <button onClick={handleAccept} type="button" class="btn btn-success"><i class="fas fa fa-check"></i>Accept</button>
                        <button onClick={handleReject} type="button" class="btn btn-danger"><i class="fas fa fa-times"></i>Reject</button>
                    </div>
                </div>
            </div>
        )
}


export default BookingRequests;