import React,{ Component } from "react";
import { connect } from "react-redux";
import { RegisterCar } from "../../Redux/Services/CarServices";

class Car extends Component{

    handleSubmit = (e) =>{
    e.preventDefault();
        const name = document.getElementById("carName").value;
        const typeName =  Number(document.getElementById("carType").value);
        const seatCapacity =  Number(document.getElementById("seatCapacity").value);
        const carNumber = document.getElementById("carNumber").value;
        const car={
            name,
            typeName,
            carNumber,
            seatCapacity
        }
        console.log(car);
        this.props.registerCar(car);
        if(this.props.car.isPresent){
            
        }
    }

    render(){
        return(
            <div className="appBackground">
                     <div className="row">
                     <div className="rideBookCard col-md-6">
                        <h2>Car Registration</h2>
                         <input onClick={this.handleCheckbox} className="rideBookCheckbox" type="checkbox"></input>
                         <form className="rideBookForm">
                             <div id="routeDetails">
                             <label className="bookFormLabel" htmlFor="carName">Car Name</label><br></br>
                             <input type="text" name="carName" defaultValue="" id="carName" ref ={(input) => this.getFromArea = input} required/><br></br>
                             <label className="bookFormLabel" htmlFor="carType">Car Type</label><br></br><br></br>
                             <select className="form-control" defaultValue="" id="carType" required>
                                    <option value="1" className="dropdown-item">Hatchback</option>
                                    <option value="2" className="dropdown-item">Sedan</option>
                                    <option value="3" className="dropdown-item">SUV</option>
                                    <option value="4" className="dropdown-item">Crossover</option>
                                    <option value="5" className="dropdown-item">Convertible</option>
                            </select>
                            <label className="bookFormLabel" htmlFor="carNumber">Car Number</label><br></br>
                             <input type="text" name="carName" defaultValue="" id="carNumber" ref ={(input) => this.getFromArea = input} required/><br></br>
                            <label className="bookFormLabel" htmlFor="seatCapacity">Seat Capacity</label><br></br><br></br>
                             <select className="form-control" defaultValue="" id="seatCapacity" required>
                                    <option value="1" className="dropdown-item">1</option>
                                    <option value="2" className="dropdown-item">2</option>
                                    <option value="3" className="dropdown-item">3</option>
                                    <option value="4" className="dropdown-item">4</option>
                                    <option value="5" className="dropdown-item">5</option>
                            </select>
                             </div>
                             <button onClick={this.handleSubmit} className="submitBtn">Submit</button>
                         </form>
                     </div>
                 </div>
             </div>
            )
        }
}

const mapStateToProps = state =>{
    return{
        car : state.car
    }
}

 const mapDispatchToProps = (dispatch) =>{
     return{
         registerCar:(car) => dispatch(RegisterCar(car))
     };
 }

export default connect(mapStateToProps,mapDispatchToProps)(Car);