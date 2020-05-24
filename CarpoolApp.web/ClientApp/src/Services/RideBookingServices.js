import { searchRidesSuccess, fetchBookingSuccess, fetchBookingRequestsSuccess, fetchAllBookingsSuccess, failure } from "../Store/Actions/RideBookingActions";

export const CreateRideBooking =(rideBooking) => {
    
        fetch('https://localhost:44304/bookings/createbooking',{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token},
        body: JSON.stringify(rideBooking)})
        .then(response=>{
            window.location.href='/home';
        })
        .catch(error=>{
            console.log(error);
        });
}

export const searchAvailableRides =(startPoint,destination,seats,rideBookingDate,time,dispatch) => {
        fetch('https://localhost:44304/bookings/searchavailablerides/' + JSON.parse(sessionStorage.getItem('authorized')).userId + '?startpoint=' + startPoint + '&destination=' + destination + '&seats=' + seats + '&rideBookingDate=' + rideBookingDate + '&time=' + time, {
            method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
        })
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            dispatch(searchRidesSuccess(response));
        })
        .catch(error=>{
            dispatch(failure(error));
            console.log(error);
        });
}

export const getBooking =(dispatch) => {
        fetch('https://localhost:44304/bookings/getride/'+JSON.parse(sessionStorage.getItem('lastActions')).lastBookingId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
        })
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            dispatch(fetchBookingSuccess(response));
        })
        .catch(error=>{
            dispatch(failure(error));
            console.log(error);
        });
}

export const getBookingRequests =(dispatch) => {
        fetch('https://localhost:44304/bookings/getbookingrequests/'+JSON.parse(sessionStorage.getItem('authorized')).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
        })
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            dispatch(fetchBookingRequestsSuccess(response));
        })
        .catch(error=>{
            dispatch(failure(error));
            console.log(error);
        });
}

export const setBookingStatus =(bookingId,status) => {
        fetch('https://localhost:44304/bookings/setbookingstatus?rideofferid='+JSON.parse(sessionStorage.getItem('lastActions')).lastRideOfferedId+'&bookingId='+bookingId+'&status='+status,{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
        })
        .then(response=>{
            console.log(response);
            window.location.reload(false);
        })
        .catch(error=>{
            console.log(error);
        });
}

export const getAllBookings = (dispatch) => {
        fetch('https://localhost:44304/bookings/getbookings/'+JSON.parse(sessionStorage.getItem('authorized')).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
        })
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            dispatch(fetchAllBookingsSuccess(response));
        })
        .catch(error=>{
            dispatch(failure(error));
            console.log(error);
        });
}