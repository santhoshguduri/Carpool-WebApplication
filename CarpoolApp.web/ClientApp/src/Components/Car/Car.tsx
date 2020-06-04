import React,{ Component } from "react";
import { connect } from "react-redux";
import { RegisterCar } from "../../Redux/Services/CarServices";
import { Dispatch, AnyAction } from "redux";

interface IProps {
    isPresent : boolean,
    registerCar : (car : ICar) => void
}

interface IState {
    carName : string,
    carType : Number,
    seatCapacity : Number,
    carNumber : string
}

export interface ICar{
    name : string,
    typeName : Number,
    carNumber : string,
    seatCapacity : Number
}

class Car extends Component<IProps,IState>{

    handleSubmit = (e :React.MouseEvent) =>{
        e.preventDefault();
        const name = this.state.carName;
        const typeName = this.state.carType;
        const seatCapacity = Number(this.state.seatCapacity);
        const carNumber = this.state.carNumber;
        const car={
            name,
            typeName,
            carNumber,
            seatCapacity
        }
        console.log(car);
        this.props.registerCar(car);
        if(this.props.isPresent){
            
        }
    }

    handleOnchange = (event : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="appBackground">
                     <div className="row">
                     <div className="rideBookCard col-md-6">
                        <h2>Car Registration</h2>
                         <input className="rideBookCheckbox" type="checkbox"></input>
                         <form className="rideBookForm">
                             <div id="routeDetails">
                                <label className="bookFormLabel" htmlFor="carName">Car Name</label><br></br>
                                <input type="text" name="carName" onChange={this.handleOnchange} defaultValue="" id="carName" required /><br></br>
                                <label className="bookFormLabel" htmlFor="carType">Car Type</label><br></br><br></br>
                                <select className="form-control" name="carType" onChange={this.handleOnchange} defaultValue="" id="carType" required>
                                    <option value="1" className="dropdown-item">Hatchback</option>
                                    <option value="2" className="dropdown-item">Sedan</option>
                                    <option value="3" className="dropdown-item">SUV</option>
                                    <option value="4" className="dropdown-item">Crossover</option>
                                    <option value="5" className="dropdown-item">Convertible</option>
                            </select>
                                <label className="bookFormLabel" htmlFor="carNumber">Car Number</label><br></br>
                                <input type="text" name="carNumber" onChange={this.handleOnchange} defaultValue="" id="carNumber" required /><br></br>
                                <label className="bookFormLabel" htmlFor="seatCapacity">Seat Capacity</label><br></br><br></br>
                                <select className="form-control" name="seatCapacity" onChange={this.handleOnchange} defaultValue="" id="seatCapacity" required>
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

interface StateProps {
    isCarPresent : boolean 
}

interface DispatchProps {
    registerCar : (car :ICar) => void
}

const mapStateToProps = (state : any) =>{
    return{
        isCarPresent : state.car.isPresent
    }
}

 const mapDispatchToProps = (dispatch : any) =>{
     return{
         registerCar:(car : ICar) => dispatch(RegisterCar(car))
     };
 }

export default connect<StateProps,DispatchProps>(mapStateToProps,mapDispatchToProps)(Car);