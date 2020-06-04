import React,{Component} from 'react';
import { connect, DispatchProp } from 'react-redux';
import AutoComplete from '../Shared/AutoComplete';
import { CreateRideOffer } from '../../Redux/Services/RideOfferingServices';
import { Dispatch } from 'redux';

interface IProps{
    date:Date,
    time:string,
    fromArea : string,
    toArea : string,
    onRideCreate : (rideOffer : IOfferRide) => void
}

interface IState{
    dotsLength :number,
    stopNumber:number,
    addresses :Array<string>,
    seats : number
}

export interface IOfferRide {
    route : Array<string>,
    availableSeats:number,
    rideOfferedDate:Date,
    carId : number,
    time :string
}

class OfferRideStops extends Component<IProps,IState>{
    constructor(props : IProps){
        super(props);
        this.state={
            dotsLength :0,
            stopNumber:1,
            addresses :[""],
            seats :0
        }
    }

    addNavigationPoints = () =>{
        let dotElements = [];
        for (let index = 0; index < this.state.dotsLength; index++) 
        {
            dotElements.push(<i className="fas fa middle fa-circle"></i>)                    
        }
        return dotElements;
    }
    
    handleOnChangeStops= (data :string,index : number) =>{
        this.state.addresses[index]=data;
          this.setState({
              addresses: this.state.addresses
          });
          console.log(this.state.addresses);
    }

    addNewStop = () =>{
        this.setState({
            dotsLength: this.state.dotsLength + 4,
            stopNumber:this.state.stopNumber + 1,
            addresses:[...this.state.addresses,""]
        });  
    }

    handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit=(e : React.MouseEvent)=>{
        e.preventDefault();
        var route = [];
        route = [this.props.fromArea, ...this.state.addresses, this.props.toArea];
        var availableSeats = Number(this.state.seats);
        
        var rideOfferedDate = this.props.date;
        var time = this.props.time;
        var carId = JSON.parse(sessionStorage.getItem("carId")!);
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
                        <AutoComplete handleOnChange={(data :string,index : number) => this.handleOnChangeStops(data,index)} search="stop" indexKey={index}  place={address}/>
                        </div>
                        </React.Fragment>
                        ))}
                        <h1 onClick={this.addNewStop} id="addStop">+</h1>
                        </div>                          
                            
                        </div>
                        <div id="routeRepresent">
                        <i className="fas fa first fa-circle"></i>
                        {this.addNavigationPoints()}
                        <i className="fas fa fa-map-marker"></i>
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

interface StateProps {
    fromArea:string,
    toArea:string,
    autocomplete : string
}

interface DispatchProps {
    onRideCreate : (data : IOfferRide) => void 
}

const mapStateToProps = (state:any) : StateProps =>{
    return{
        fromArea:state.searchFrom.place,
        toArea:state.searchTo.place,
        autocomplete : state.checkPoint
    };
}

const mapDispatchToProps = (dispatch : any) :DispatchProps=>{
    return{
        onRideCreate : (data : IOfferRide) => dispatch(CreateRideOffer(data))
    }
}


export default connect<StateProps,DispatchProps>(mapStateToProps,mapDispatchToProps)(OfferRideStops);