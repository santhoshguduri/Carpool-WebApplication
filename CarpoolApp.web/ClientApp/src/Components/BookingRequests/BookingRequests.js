import React,{ Component } from "react";
import { connect } from "react-redux";
import { getBookingRequests, setBookingStatus } from "../../Redux/Services/RideBookingServices";
import MatchedUser from "../MatchedUser/MatchedUsers";

class BookingRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            BookingStatus :{
                Accepted:1,
                Rejected:2
            }
        }
    }
    componentDidMount(){
        this.props.getBookingRequests();
    }

    handleOnClick =(bookingId)=>{
        this.setState({
            bookingId:bookingId
        })
        document.getElementById('confirmation').style.display="block";
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
                        this.props.requests.map((booking) =>(
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
                        <button onClick={this.handleAccept} type="button" class="btn btn-success"><i class="fas fa fa-check"></i>Accept</button>
                        <button onClick={this.handleReject} type="button" class="btn btn-danger"><i class="fas fa fa-times"></i>Reject</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return{
        requests:state.fetchRequests.rides
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getBookingRequests : () => dispatch(getBookingRequests()),
        setStatus : (bookingId,status) => dispatch(setBookingStatus(bookingId,status))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingRequests);