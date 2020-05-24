import React,{ useState, useContext} from 'react';
import {AutoComplete} from '../Shared/AutoComplete';
import { CreateRideOffer } from '../../Services/RideOfferingServices';
import { AutocompleteContext } from '../../Store/Context/AutocompleteContext';
import { RideContext } from '../../Store/Context/RidesContext';

export function OfferRideStops(props) {
    
    const [state,setState] = useState({
            dotsLength :0,
            stopNumber:1,
            addresses :[""]
    })

    const autocompleteContext = useContext(AutocompleteContext)

    const rideContext = useContext(RideContext)

    const addNavigationPoints = () =>{
        let dotElements = [];
        for (let index = 0; index < state.dotsLength; index++) 
        {
            dotElements.push(<i class="fas fa middle fa-circle"></i>)                    
        }
        return dotElements;
    }
    
    const handleOnChangeStops= (data,index) =>{
        state.addresses[index]=data;
          setState({
              ...state,
              addresses: state.addresses
          });
          console.log(state.addresses);
    }

    const addNewStop = () =>{
        setState({
            ...state,
            dotsLength: state.dotsLength+4,
            stopNumber:state.stopNumber+1,
            addresses:[...state.addresses,""]
        });  
    }

    const handleOnChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        var normalRoute = [];
        normalRoute = [autocompleteContext.autocompleteState.fromArea, ...state.addresses, autocompleteContext.autocompleteState.toArea];
        var availableSeats = Number(state.seats);
        
        var rideOfferedDate = props.date;
        var time = props.time;
        var carId = JSON.parse(sessionStorage.getItem("carId"));
        var offerRide ={
            normalRoute,
            availableSeats,
            rideOfferedDate,
            carId,
            time
        }
        console.log(offerRide);
        CreateRideOffer(offerRide,rideContext.rideDispatch);
    }
            
        return(
            <div className="row">
            <div id="OfferRideStopsCard" className="rideBookCard">
                   <h2>Offer a Ride</h2>    
                    <p>we get you the matches asap !</p>
                    <input className="rideBookCheckbox" type="checkbox"/>
                    <form className="rideBookForm">
                        <div id="stopsDetails">
                            
                        <div id="firstStop" >
                        {
                        state.addresses.map((address,index) =>(
                        <React.Fragment>
                        <label className="bookFormLabel" htmlFor="stop1">Stop {++index}</label>
                        <div className="dropdown">
                        <AutoComplete handleOnChange={(data,index) => handleOnChangeStops(data,index)} search="stop" indexKey={index}  place={address}/>
                        </div>
                        </React.Fragment>
                        ))}
                        <h1 onClick={addNewStop} id="addStop">+</h1>
                        </div>                          
                            
                        </div>
                        <div id="routeRepresent">
                        <i class="fas fa first fa-circle"></i>
                        {addNavigationPoints()}
                        <i class="fas fa fa-map-marker"></i>
                        </div>
                        <div className="seatsSelect">
                        <label className="bookFormLabel" >Available Seats</label><br></br>
                        <div className="seatSelectDiv">   
                            <input className="seatsSelect" onChange={handleOnChange} name="seats" value="1" type="radio" id="one" />
                            <label className="seatsSelectLabel" htmlFor="one">1</label>
                        </div>
                            <div className="seatSelectDiv">
                            <input className="seatsSelect" onChange={handleOnChange} name="seats" value="2" type="radio" id="two" />
                            <label className="seatsSelectLabel" htmlFor="two">2</label>
                        </div>
                        <div className="seatSelectDiv">
                            <input className="seatsSelect" onChange={handleOnChange} name="seats" value="3" type="radio" id="three" />
                            <label className="seatsSelectLabel" htmlFor="three">3</label>
                        </div>
                        </div>
                            <button onClick={handleSubmit} className="submitBtn">Submit</button>
                    </form>
                </div>
                </div>
        )
}
