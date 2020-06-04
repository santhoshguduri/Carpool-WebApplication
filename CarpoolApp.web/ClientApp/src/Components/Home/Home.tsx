import React,{Component} from 'react';
import { CheckIfUserCarRegistered } from '../../Redux/Services/CarServices';
import { connect } from 'react-redux';
import { getLastActionsId } from '../../Redux/Services/AuthenticationServices';

interface IProps {
    isCarPresent : boolean,
    getActionKeys : () => void,
    checkCarRegistered : (id : number) => void
}

interface IState {

}

class Home extends Component<IProps,IState>{

    componentDidMount(){
        this.props.getActionKeys();
        this.props.checkCarRegistered(JSON.parse(sessionStorage.getItem('authorized')!).userId);
    }

    handleBookRide= () =>{
        if(sessionStorage.getItem('isBooking') !=null){
            sessionStorage.removeItem('isBooking');
        }
        sessionStorage.setItem('isBooking',JSON.stringify(true));
        window.location.href='/bookride'
    }

    handleOfferRide = () =>{
        if(sessionStorage.getItem('isBooking') !=null){
            sessionStorage.removeItem('isBooking');
        }
        sessionStorage.setItem('isBooking',JSON.stringify(false));
        if(this.props.isCarPresent == true){
            window.location.href='/offerride';
        }
        else{
            window.location.href='/vechileregistration';
        }
    }

    render(){
        return(
            <div id="profile">
                <h2 id="userGreeting">Hey {JSON.parse(sessionStorage.getItem('authorized')!).name}!</h2>
                <div id="userOptions">
                <p onClick={this.handleBookRide} id="bookRide">Book a ride</p>
                <p onClick={this.handleOfferRide} id="offerRide">Offer a ride</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state : any) =>{
    return{
        isCarPresent : state.checkCarPresent.isPresent
    };
}

const mapDispatchToProps = (dispatch : any) =>{
    return{
        checkCarRegistered : (id : number) => dispatch(CheckIfUserCarRegistered(id)),
        getActionKeys : () => dispatch(getLastActionsId())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);