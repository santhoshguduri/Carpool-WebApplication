import React,{ Component } from "react";
import { connect } from "react-redux";
import { getBookingRequests, setBookingStatus } from "../../Redux/Services/RideBookingServices";
import MatchedUser from "../MatchedUser/MatchedUsers";
import { Dispatch, AnyAction } from "redux";
import {IBooking} from '../Shared/SharedContracts'

interface IState{
    bookingId:Number,
    BookingStatus :{
        Accepted:Number,
        Rejected:Number
    }
}

interface IProps{
    requests : [],
    getBookingRequests : () => void,
    setStatus : (id:Number,status : Number) => void
}

interface IDispatchProps{
    getBookingRequests : () => void,
    setStatus : (bookingId : Number,status : Number) => void
}

class BookingRequests extends Component<IProps,IState>{
    constructor(props : IProps){
        super(props);
        this.state ={
            bookingId : 0,
            BookingStatus :{
                Accepted:1,
                Rejected:2
            }
        }
    }
    componentDidMount(){
        this.props.getBookingRequests();
    }

    handleOnClick =(bookingId : Number)=>{
        this.setState({
            ...this.state,
            bookingId:bookingId
        })
        document.getElementById('confirmation')!.style.display="block";
    }

    handleAccept =()=>{
        this.props.setStatus(this.state.bookingId,this.state.BookingStatus.Accepted);
    }

    handleReject =()=>{
        this.props.setStatus(this.state.bookingId,this.state.BookingStatus.Rejected);
    }

    render(){
        return(
            <div className="appBackground">
                <div id="bookedRequests">
                    {this.props.requests.length != 0?
                        <h3>Booking Requests</h3> : <React.Fragment></React.Fragment>}
                    {
                        this.props.requests.map((booking : IBooking) =>(
                            <div onClick={()=>this.handleOnClick(booking.bookingId)} id="request">
                            <MatchedUser ride={booking}/>
                            </div>
                        ))
                    }
                    {
                        this.props.requests.length == 0?
                        <h4>No pending booking requests</h4> : <React.Fragment></React.Fragment>
                    }
                    <div id="confirmation">
                        <h4>Do you want to accept the booking request ?</h4>
                        <button onClick={this.handleAccept} type="button" className="btn btn-success"><i className="fas fa fa-check"></i>Accept</button>
                        <button onClick={this.handleReject} type="button" className="btn btn-danger"><i className="fas fa fa-times"></i>Reject</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps= (state : any) =>{
    return{
        requests : state.fetchRequests.rides
    }
}

const mapDispatchToProps = (dispatch : any) : IDispatchProps =>{
    return{
        getBookingRequests : () => dispatch(getBookingRequests()),
        setStatus : (bookingId : Number,status : Number) => dispatch(setBookingStatus(bookingId,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingRequests);