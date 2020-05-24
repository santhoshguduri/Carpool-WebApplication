import React,{useState, useEffect, useContext} from 'react';
import MatchedUser from '../MatchedUser/MatchedUsers';
import {OfferRideStops} from '../OfferRide/OfferRideStops';
import {AutoComplete} from '../Shared/AutoComplete';
import { CreateRideBooking, searchAvailableRides } from '../../Services/RideBookingServices';
import { BookingContext } from '../../Store/Context/BookingContext';
import { AutocompleteContext } from '../../Store/Context/AutocompleteContext';

function BookRide() {
    
    const [ride,setRide] = useState({});

    const bookingContext = useContext(BookingContext);

    const autocompleteContext = useContext(AutocompleteContext)

    useEffect( () => {
        if(JSON.parse(sessionStorage.getItem('isBooking'))){
        document.getElementById('rideBookCard').style.height="80vh";
        document.getElementById('rideBookCard').style.transform="translate(20%,15%)";
        }
    },[])

    const handleNextBtn = (e) =>{
        e.preventDefault();
        var rideDate = ride.date;
        var rideTime = ride.time;
        if(autocompleteContext.autocompleteState.fromArea != '' && autocompleteContext.autocompleteState.toArea !='' && rideTime != '' && rideDate != '')
        {
            setRide({...ride,
                rideTime:rideTime,
                rideDate:rideDate
            });
            document.getElementById("renderStopComponent").style.display="block";
        }
        if (JSON.parse(sessionStorage.getItem('isBooking'))) {
            var seats = ride.seats;
            console.log(autocompleteContext.autocompleteState.fromArea, autocompleteContext.autocompleteState.toArea, seats, rideDate, rideTime);
            searchAvailableRides(autocompleteContext.autocompleteState.fromArea,autocompleteContext.autocompleteState.toArea,seats,rideDate,rideTime,bookingContext.bookingDispatch);
        }
    }

    const handleCheckbox = () =>{
        document.getElementById("renderStopComponent").style.display="none";
    }

    const handleOnChange = (event) => {
        setRide({...ride,
            [event.target.name]: event.target.value
        });
    }

    const handleCreateBooing = (e) => {
        e.preventDefault();
        var rideBookingDate = ride.date;
        var time = ride.time;
        
        var seats = Number(ride.seats);
        var startPoint = autocompleteContext.autocompleteState.fromArea;
        var destination = autocompleteContext.autocompleteState.toArea;
        var rideFair = ride.price;
        var rideOfferId = ride.offeredRideId;
        var bookingUserId = JSON.parse(sessionStorage.getItem('authorized')).userId;
        const booking ={
            startPoint,
            destination,
            time,
            seats,
            rideFair,
            rideOfferId,
            rideBookingDate,
            bookingUserId
        }
        console.log(booking);
        CreateRideBooking(booking);
    } 

    const handleOnClick = (ride) =>{
        setRide({
            ...ride,
            price: ride.rideFair,
            offeredRideId : ride.rideOfferId
        });
        document.getElementById("confirmationDiv").style.display="block";
    }

    const handleCancel = () =>{
        document.getElementById("confirmationDiv").style.display="none";
    }

    console.log(autocompleteContext.autocompleteState.fromArea,autocompleteContext.autocompleteState.toArea);
    return(
            
       <div className="appBackground">
                <div className="row">
                <div id="rideBookCard" className="rideBookCard col-md-6">
                    { JSON.parse(sessionStorage.getItem('isBooking'))?
                        <h2>Book a Ride</h2>:<h2>Offer a Ride</h2>
                    }
                    <p>we get you the matches asap !</p>
                    <input className="rideBookCheckbox" type="checkbox"></input>
                    <form className="rideBookForm">
                        <div id="routeDetails">
                        <label className="bookFormLabel" htmlFor="from">From</label><br></br>
                        <div class="dropdown">
                        <AutoComplete handlePlaceChange={autocompleteContext.autocompleteDispatch} search="from" />
                        </div>
                        <label className="bookFormLabel" htmlFor="to">To</label><br></br>
                        <div class="dropdown">
                        <AutoComplete handlePlaceChange={autocompleteContext.autocompleteDispatch} search="to" />
                        </div>
                        <label className="bookFormLabel" htmlFor="date">Date</label><br></br>
                                <input type="date"
                                    onChange={handleOnChange}
                                    name="date"
                                    id="date"
                                    required /><br></br>
                        </div>
                        <div id="routeRepresent">
                        <i class="fas fa first fa-circle"></i>
                        <i class="fas fa middle fa-circle"></i>
                        <i class="fas fa middle fa-circle"></i>
                        <i class="fas fa middle fa-circle"></i>
                        <i class="fas fa middle fa-circle"></i>
                        <i class="fas fa fa-map-marker"></i>
                        </div>
                        {JSON.parse(sessionStorage.getItem('isBooking'))?
                            <React.Fragment>
                                    <label className="bookFormLabel" htmlFor="seatCapacity" >Select Seats</label><br></br>
                                    <select className="form-control"
                                        onChange={handleOnChange}
                                        name="seats"
                                        id="seatCapacity"
                                        required>
                                    <option value="" className="dropdown-item"> -- Select Seats -- </option>
                                    <option value="1" className="dropdown-item">1</option>
                                    <option value="2" className="dropdown-item">2</option>
                                    <option value="3" className="dropdown-item">3</option>
                                    <option value="4" className="dropdown-item">4</option>
                                    <option value="5" className="dropdown-item">5</option>
                            </select>
                            </React.Fragment>:<React.Fragment></React.Fragment>}
                        <label className="bookFormLabel" >Time</label><br></br>
                        <div className="checkboxDiv">   
                                <input className="timeCheckbox"
                                    onChange={handleOnChange}
                                    type="radio"
                                    value="5am-9am"
                                    name="time"
                                    id="5-9" />
                            <label className="timeCheckboxLabel" htmlFor="5-9">5am - 9am</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={handleOnChange}
                                    type="radio"
                                    value="9am-12pm"
                                    name="time"
                                    id="9-12" />
                        <label className="timeCheckboxLabel" htmlFor="9-12">9am - 12pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={handleOnChange}
                                    type="radio"
                                    value="12pm-3pm"
                                    name="time"
                                    id="12-3" />
                        <label className="timeCheckboxLabel" htmlFor="12-3">12pm - 3pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={handleOnChange}
                                    type="radio"
                                    value="3pm-6pm"
                                    name="time"
                                    id="3-6" />
                        <label className="timeCheckboxLabel" htmlFor="3-6">3pm - 6pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={handleOnChange}
                                    type="radio"
                                    value="6pm-9pm"
                                    name="time"
                                    id="6-9" />
                        <label className="timeCheckboxLabel" htmlFor="6-9">6pm - 9pm</label><br></br>
                        </div>
                        {JSON.parse(sessionStorage.getItem('isBooking'))?
                            <button onClick={handleNextBtn} className="submitBtn">Submit</button>:<h4 onClick={handleNextBtn}>Next >></h4>
                        }
                    </form>
                </div>
            </div>
            <div id="renderStopComponent">
                {JSON.parse(sessionStorage.getItem('isBooking'))?
                    <div className="matchedUsers">
                    {
                        bookingContext.bookingState.rides.length!=0?
                            (<h2>Your Matches</h2>):<h3>No Rides Offers Aavailable as of now. Please try after sometime</h3>}
                    {
                        bookingContext.bookingState.rides.map((ride) =>
                            <div onClick={() => handleOnClick(ride)}>
                            <MatchedUser key={ride.rideOfferId} ride ={ride}/>
                            </div>
                    )}
                    <div id="confirmationDiv">
                        <h3>Confirm Booking ?</h3>
                        <button onClick={handleCreateBooing} type="button" class="btn btn-success">Book</button>
                        <button onClick={handleCancel} type="button" class="btn btn-danger">Cancel</button>
                    </div>
                </div>:<OfferRideStops date={ride.rideDate} time={ride.rideTime} />
                }
            </div>
        </div>
        )
}

export default BookRide;