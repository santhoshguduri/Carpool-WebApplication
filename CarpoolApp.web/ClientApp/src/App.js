import React from 'react';
import './App.css';
import { Route } from 'react-router'
import Layout from './Components/Shared/Layout'
import AppStart from './Components/Athentication/SharedAppStart'
import Home from './Components/Home/Home';
import MyRides from './Components/MyRides/MyRides';
import BookingStatus from './Components/BookingStatus/BookingStatus';
import BookingRequests from './Components/BookingRequests/BookingRequests';
import './Components/BookingStatus/BookingStatusStylesheet.css'
import './Components/Athentication/SignupStylesheet.css';
import './Components/BookRide/rideBookingStylesheet.css';
import './Components/NavigationBar/navBarStylesheet.css';
import './Components/MatchedUser/matchedUsersStylesheet.css';
import './Components/OfferRide/OfferRideStylesheet.css';
import './Components/MyRides/MyRidesStylesheet.css'
import './Components/Home/ProfileStylesheet.css';
import './Components/BookingRequests/BookingRequestsStyle.css';
import BookRide from './Components/BookRide/BookRide';
import ProtectedRoute from './Components/Shared/ProtectedRoute';
import Car from './Components/Car/Car';

function App() {
    return (
        <div className="App">
            <Layout>
                <Route exact path='/' component={AppStart} />
                <Route exact path='/home' component={Home}>
                    <ProtectedRoute component={Home} />
                </Route>
                <Route exact path='/vechileregistration' component={Car}>
                    <ProtectedRoute component={Car} />
                </Route>
                <Route exact path='/bookingstatus' component={BookingStatus}>
                    <ProtectedRoute component={BookingStatus} />
                </Route>
                <Route exact path='/bookingrequests' component={BookingRequests}>
                    <ProtectedRoute component={BookingRequests} />
                </Route>
                <Route exact path='/myrides' component={MyRides}>
                    <ProtectedRoute component={MyRides} />
                </Route>
                <Route exact path='/bookride' component={BookRide}>
                    <ProtectedRoute component={BookRide} />
                </Route>
                <Route exact path='/offerride' component={BookRide}>
                    <ProtectedRoute component={BookRide} />
                </Route>
            </Layout>
        </div>
    );
}

export default App;
