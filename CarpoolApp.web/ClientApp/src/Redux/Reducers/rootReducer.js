import { combineReducers } from "redux";

import {userAuthenticationReducer} from '../Reducers/AuthenticationReducer';
import {toggleReducer} from '../Reducers/AuthenticationReducer'
import { checkCarPresentReducer, createCarReducer } from "./CarReducer";
import { fromAutoCompleteReducer, toAutoCompleteReducer, viaPointAutoCompleteReducer, checkpointAutoCompleteReducer } from "./AutocompleteReducer";
import { RideOfferingReducer, fetchAllRidesOfferedReducer } from "./RideOfferingsReducer";
import { searchRidesReducer, fetchBookingReducer, fetchBookingRequestsReducer, fetchAllBookingsReducer } from "./RideBookingReducer";

export const rootReducer = combineReducers({
    authenticate: userAuthenticationReducer,
    toggle: toggleReducer,
    checkCarPresent : checkCarPresentReducer,
    car : createCarReducer,
    searchFrom : fromAutoCompleteReducer,
    searchTo : toAutoCompleteReducer,
    viaPoint : viaPointAutoCompleteReducer,
    checkPoint : checkpointAutoCompleteReducer,
    rideOffer:RideOfferingReducer,
    searchAvailable:searchRidesReducer,
    fetchBooking:fetchBookingReducer,
    fetchRequests:fetchBookingRequestsReducer,
    fetchAllBookings:fetchAllBookingsReducer,
    fetchAllRidesOffered:fetchAllRidesOfferedReducer
})