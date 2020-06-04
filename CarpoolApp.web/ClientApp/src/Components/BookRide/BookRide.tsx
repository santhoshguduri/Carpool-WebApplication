import React,{Component} from 'react';
import MatchedUser from '../MatchedUser/MatchedUsers';
import OfferRideStops from '../OfferRide/OfferRideStops';
import { connect, DispatchProp } from 'react-redux';
import AutoComplete from '../Shared/AutoComplete';
import { CreateRideBooking, searchAvailableRides } from '../../Redux/Services/RideBookingServices';
import {IBooking} from '../Shared/SharedContracts'


interface IProps {
    rides : IBooking[],
    fromArea : string,
    toArea : string,
    searchAvailable : (from : string,to : string,seats : Number,date : Date,time : string) => void,
    createBooking : (booking :IRideBooking) =>void
}

interface IState {
    date : Date,
    time : string,
    rideDate : Date,
    rideTime : string,
    seats : Number,
    price :Number,
    offeredRideId : Number
}

export interface IRideBooking {
    startPoint : string,
    destination : string,
    time : string,
    seats : Number,
    rideFair : Number,
    rideOfferId : Number,
    rideBookingDate : Date,
    bookingUserId : Number
}

class BookRide extends Component<IProps,IState>{
    constructor(props : IProps){
        super(props);
        this.state={
            rideDate:new Date(2000,1,1),
            rideTime:'',
            date:new Date(2000,1,1),
            time:'',
            seats:0,
            price:0,
            offeredRideId:0
        } 
    }
    componentDidMount(){
        if(JSON.parse(sessionStorage.getItem('isBooking')!)){
        document.getElementById('rideBookCard')!.style.height="80vh";
        document.getElementById('rideBookCard')!.style.transform="translate(20%,15%)";
        }
    }

    handleNextBtn = (e : any) =>{
        e.preventDefault();
        var rideDate = this.state.date;
        var rideTime = this.state.time;
        if(this.props.fromArea != '' && this.props.toArea !='' && rideTime != '' && rideDate != new Date(2000,1,1))
        {
            this.setState({
                rideTime:rideTime,
                rideDate:rideDate
            });
            document.getElementById("renderStopComponent")!.style.display="block";
        }
        if (JSON.parse(sessionStorage.getItem('isBooking')!)) {
            var seats = Number(this.state.seats);
            console.log(this.props.fromArea, this.props.toArea, seats, rideDate, rideTime);
            this.props.searchAvailable(this.props.fromArea,this.props.toArea,seats,rideDate,rideTime);
        }
    }

    handleCheckbox = () =>{
        document.getElementById("renderStopComponent")!.style.display="none";
    }

    handleOnChange = (event : any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleCreateBooking = (e : React.MouseEvent) => {
        e.preventDefault();
        var rideBookingDate = this.state.date;
        var time = this.state.time;
        
        console.log(this.props.fromArea);
        var seats = Number(this.state.seats);
        var startPoint = this.props.fromArea;
        var destination = this.props.toArea;
        var rideFair = this.state.price;
        var rideOfferId = this.state.offeredRideId;
        var bookingUserId = JSON.parse(sessionStorage.getItem('authorized')!).userId;
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
        this.props.createBooking(booking);
    } 

    handleOnClick = (ride : IBooking) =>{
        this.setState({
            price: ride.rideFair,
            offeredRideId : ride.rideOfferId
        });
        document.getElementById("confirmationDiv")!.style.display="block";
    }

    handleCancel = () =>{
        document.getElementById("confirmationDiv")!.style.display="none";
    }

    render(){
        console.log(this.props.fromArea,this.props.toArea);
        return(
            
       <div className="appBackground">
                <div className="row">
                <div id="rideBookCard" className="rideBookCard col-md-6">
                    { JSON.parse(sessionStorage.getItem('isBooking')!)?
                        <h2>Book a Ride</h2>:<h2>Offer a Ride</h2>
                    }
                    <p>we get you the matches asap !</p>
                    <input onClick={this.handleCheckbox} className="rideBookCheckbox" type="checkbox"></input>
                    <form className="rideBookForm">
                        <div id="routeDetails">
                        <label className="bookFormLabel" htmlFor="from">From</label><br></br>
                        <div className="dropdown">
                        <AutoComplete search="from" />
                        </div>
                        <label className="bookFormLabel" htmlFor="to">To</label><br></br>
                        <div className="dropdown">
                        <AutoComplete search="to" />
                        </div>
                        <label className="bookFormLabel" htmlFor="date">Date</label><br></br>
                                <input type="date"
                                    onChange={this.handleOnChange}
                                    name="date"
                                    id="date"
                                    required /><br></br>
                        </div>
                        <div id="routeRepresent">
                        <i className="fas fa first fa-circle"></i>
                        <i className="fas fa middle fa-circle"></i>
                        <i className="fas fa middle fa-circle"></i>
                        <i className="fas fa middle fa-circle"></i>
                        <i className="fas fa middle fa-circle"></i>
                        <i className="fas fa fa-map-marker"></i>
                        </div>
                        {JSON.parse(sessionStorage.getItem('isBooking')!)?
                            <React.Fragment>
                                    <label className="bookFormLabel" htmlFor="seatCapacity" >Select Seats</label><br></br>
                                    <select className="form-control"
                                        onChange={this.handleOnChange}
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
                                    onChange={this.handleOnChange}
                                    type="radio"
                                    value="5am-9am"
                                    name="time"
                                    id="5-9" />
                            <label className="timeCheckboxLabel" htmlFor="5-9">5am - 9am</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={this.handleOnChange}
                                    type="radio"
                                    value="9am-12pm"
                                    name="time"
                                    id="9-12" />
                        <label className="timeCheckboxLabel" htmlFor="9-12">9am - 12pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={this.handleOnChange}
                                    type="radio"
                                    value="12pm-3pm"
                                    name="time"
                                    id="12-3" />
                        <label className="timeCheckboxLabel" htmlFor="12-3">12pm - 3pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={this.handleOnChange}
                                    type="radio"
                                    value="3pm-6pm"
                                    name="time"
                                    id="3-6" />
                        <label className="timeCheckboxLabel" htmlFor="3-6">3pm - 6pm</label>
                        </div>
                        <div className="checkboxDiv">
                                <input className="timeCheckbox"
                                    onChange={this.handleOnChange}
                                    type="radio"
                                    value="6pm-9pm"
                                    name="time"
                                    id="6-9" />
                        <label className="timeCheckboxLabel" htmlFor="6-9">6pm - 9pm</label><br></br>
                        </div>
                        {JSON.parse(sessionStorage.getItem('isBooking')!)?
                            <button onClick={this.handleNextBtn} className="submitBtn">Submit</button>:<h4 onClick={this.handleNextBtn}>Next >></h4>
                        }
                    </form>
                </div>
            </div>
            <div id="renderStopComponent">
                {JSON.parse(sessionStorage.getItem('isBooking')!)?
                    <div className="matchedUsers">
                    {this.props.rides.length!=0?
                        (<h2>Your Matches</h2>):<h3>No Rides Offers Aavailable as of now. Please try after sometime</h3>}
                    {this.props.rides.map((ride) =>
                        <div onClick={() => this.handleOnClick(ride)}>
                        <MatchedUser  ride ={ride}/>
                        </div>
                    )}
                    <div id="confirmationDiv">
                        <h3>Confirm Booking ?</h3>
                        <button onClick={this.handleCreateBooking} type="button" className="btn btn-success">Book</button>
                        <button onClick={this.handleCancel} type="button" className="btn btn-danger">Cancel</button>
                    </div>
                </div>:<OfferRideStops date={this.state.rideDate} time={this.state.rideTime} />
                }
            </div>
        </div>
        )
    }
}

interface StateProps{
    fromArea:string,
    toArea:string,
    rides:IBooking[]
}

interface DispatchProps{
    createBooking : (data : IRideBooking) => void,
    searchAvailable : (from : string,to : string,seats : Number,date : Date,time : string) => void
}

const mapStateToProps= (state : any) : StateProps =>{
    return{
        fromArea:state.searchFrom.place,
        toArea:state.searchTo.place,
        rides:state.searchAvailable.rides
    }
}

const mapDispatchToProps = (dispatch : any) : DispatchProps =>{
    return{
        createBooking : (data : IRideBooking)=>dispatch(CreateRideBooking(data)),
        searchAvailable : (from : string,to : string,seats : Number,date : Date,time : string) => dispatch(searchAvailableRides(from,to,seats,date,time))
    }
}


export default connect<StateProps,DispatchProps>(mapStateToProps,mapDispatchToProps)(BookRide);