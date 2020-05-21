import React,{Component} from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../Shared/AutoComplete';
import { CreateRideOffer } from '../../Redux/Services/RideOfferingServices';

class OfferRideStops extends Component{
    constructor(props){
        super(props);
        this.state={
            dotsLength :0,
            stopNumber:1,
            addresses :[""]
        }
    }

    addNavigationPoints = () =>{
        let dotElements = [];
        for (let index = 0; index < this.state.dotsLength; index++) 
        {
            dotElements.push(<i class="fas fa middle fa-circle"></i>)                    
        }
        return dotElements;
    }
    
    handleOnChangeStops= (data,index) =>{
        this.state.addresses[index]=data;
          this.setState({
              addresses: this.state.addresses
          });
          console.log(this.state.addresses);
    }

    addNewStop = () =>{
        this.setState({
            dotsLength: this.state.dotsLength+4,
            stopNumber:this.state.stopNumber+1,
            addresses:[...this.state.addresses,""]
        });  
    }

    handleOnChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        var route = [];
        route = [this.props.fromArea, ...this.state.addresses, this.props.toArea];
        var availableSeats = Number(this.state.seats);
        
        var rideOfferedDate = this.props.date;
        var time = this.props.time;
        var carId = JSON.parse(sessionStorage.getItem("carId"));
        var offerRide ={
            route,
            availableSeats,
            rideOfferedDate,
            carId,
            time
        }
        console.log(offerRide);
        this.props.onRideCreate(offerRide);
    }

    render(){
            
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
                        this.state.addresses.map((address,index) =>(
                        <React.Fragment>
                        <label className="bookFormLabel" htmlFor="stop1">Stop {++index}</label>
                        <div className="dropdown">
                        <AutoComplete handleOnChange={(data,index) => this.handleOnChangeStops(data,index)} search="stop" indexKey={index}  place={address}/>
                        </div>
                        </React.Fragment>
                        ))}
                        <h1 onClick={this.addNewStop} id="addStop">+</h1>
                        </div>                          
                            
                        </div>
                        <div id="routeRepresent">
                        <i class="fas fa first fa-circle"></i>
                        {this.addNavigationPoints()}
                        <i class="fas fa fa-map-marker"></i>
                        </div>
                        <div className="seatsSelect">
                        <label className="bookFormLabel" >Available Seats</label><br></br>
                        <div className="seatSelectDiv">   
                            <input className="seatsSelect" name="seats" value="1" type="radio" id="one" />
                            <label className="seatsSelectLabel" htmlFor="one">1</label>
                        </div>
                            <div className="seatSelectDiv">
                            <input className="seatsSelect" name="seats" value="2" type="radio" id="two" />
                            <label className="seatsSelectLabel" htmlFor="two">2</label>
                        </div>
                        <div className="seatSelectDiv">
                            <input className="seatsSelect" name="seats" value="3" type="radio" id="three" />
                            <label className="seatsSelectLabel" htmlFor="three">3</label>
                        </div>
                        </div>
                            <button onClick={this.handleSubmit} className="submitBtn">Submit</button>
                    </form>
                </div>
                </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        fromArea:state.searchFrom.place,
        toArea:state.searchTo.place,
        autocomplete : state.checkPoint
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onRideCreate : (data) => dispatch(CreateRideOffer(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(OfferRideStops);