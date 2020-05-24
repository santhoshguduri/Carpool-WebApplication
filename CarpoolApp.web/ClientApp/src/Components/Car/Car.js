import React,{  useState, useContext } from "react";
import { RegisterCar } from "../../Services/CarServices";
import { CarContext } from "../../Store/Context/CarContext";

export function Car(props) {

    const [carDetails,setCarDetails] = useState({});

    const carContext = useContext(CarContext)

    const handleSubmit = (e) =>{
        e.preventDefault();
        const name = carDetails.carName;
        const typeName = Number(carDetails.carType);
        const seatCapacity = Number(carDetails.seatCapacity);
        const carNumber = carDetails.carNumber;
        const carOwnerId = JSON.parse(sessionStorage.getItem('authorized')).userId;
        const carId = 0;
        const car={
            name,
            typeName,
            seatCapacity,
            carOwnerId,
            carId
        }
        console.log(car);
        RegisterCar(car,carContext.carDispatch);
        if(carContext.carState.isPresent){
            
        }
    }

    const handleOnchange = (event) => {
        setCarDetails({
            ...carDetails,
            [event.target.name]: event.target.value
        })
    }

        return(
            <div className="appBackground">
                     <div className="row">
                     <div className="rideBookCard col-md-6">
                        <h2>Car Registration</h2>
                         <input className="rideBookCheckbox" type="checkbox"></input>
                         <form className="rideBookForm">
                             <div id="routeDetails">
                                <label className="bookFormLabel" htmlFor="carName">Car Name</label><br></br>
                                <input type="text" name="carName" onChange={handleOnchange} defaultValue="" id="carName" required /><br></br>
                                <label className="bookFormLabel" htmlFor="carType">Car Type</label><br></br><br></br>
                                <select className="form-control" name="carType" onChange={handleOnchange} defaultValue="" id="carType" required>
                                    <option value="1" className="dropdown-item">Hatchback</option>
                                    <option value="2" className="dropdown-item">Sedan</option>
                                    <option value="3" className="dropdown-item">SUV</option>
                                    <option value="4" className="dropdown-item">Crossover</option>
                                    <option value="5" className="dropdown-item">Convertible</option>
                            </select>
                                <label className="bookFormLabel" htmlFor="carNumber">Car Number</label><br></br>
                                <input type="text" name="carNumber" onChange={handleOnchange} defaultValue="" id="carNumber" required /><br></br>
                                <label className="bookFormLabel" htmlFor="seatCapacity">Seat Capacity</label><br></br><br></br>
                                <select className="form-control" name="seatCapacity" onChange={handleOnchange} defaultValue="" id="seatCapacity" required>
                                    <option value="1" className="dropdown-item">1</option>
                                    <option value="2" className="dropdown-item">2</option>
                                    <option value="3" className="dropdown-item">3</option>
                                    <option value="4" className="dropdown-item">4</option>
                                    <option value="5" className="dropdown-item">5</option>
                            </select>
                             </div>
                             <button onClick={handleSubmit} className="submitBtn">Submit</button>
                         </form>
                     </div>
                 </div>
             </div>
            )
}