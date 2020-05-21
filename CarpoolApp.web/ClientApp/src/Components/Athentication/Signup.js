import React,{Component} from 'react';
import { connect } from 'react-redux';
import { store } from '../../Redux/Store';
import { toggleSignupLogin } from '../../Redux/Actions/AuthenticationActions';
import { CreateUser } from '../../Redux/Services/AccountManagementServices';
import {onChangeName, onChangeEmail, onChangeMobile, onChangeGender, onChangePasswordStrength, onSubmitValidation} from './validations'


class Signup extends Component{
    constructor(props) {
        super(props);
    }
    
    handlePasswordDisplay = () =>{
        var inputElement = document.getElementById("password");
        if (inputElement.type === "password") {
            inputElement.type = "text";
        } else {
            inputElement.type = "password";
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const name = this.state.name;
        const gender = this.state.gender;
        const mobileno = this.state.mobile;
        const email = this.state.email;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        if(password==confirmPassword && password !=''){
        const user={
            name,
            gender,
            mobileno,
            email,
            password
        }
        this.props.onCreate(user);
        this.handleRedirectToLogin();
        console.log(user);
        }
        else if(password != confirmPassword){
            document.getElementById("confirmPassword").style.border="2px solid red"
            document.getElementById('passwordMatch').style.display="block";
        }
        else if(name==' '|| mobileno==''||gender==''||email==''||password==''){
            document.getElementById('formatMatch').style.display="block";
        }
        }

    handleOnchange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleRedirectToLogin = (e) => {
        
        this.props.onToggle(true);
    }

    handleonChangeName = (e) => {
        this.handleOnchange(e);
        this.props.onChangeName();
    }

    handleonChangeEmail = (e) => {
        this.handleOnchange(e);
        this.props.onChangeEmail();
    }

    handleonChangeMobile = (e) => {
        this.handleOnchange(e);
        this.props.onChangeMobile();
    }

    handleonChangeGender = (e) => {
        this.handleOnchange(e);
        this.props.onChangeGender();
    }

    handleonChangePassword = (e) => {
        this.handleOnchange(e)
        this.props.onChangePassword();
    }

    render(){
        return(
            <div id="signup-page-right">
                <div id="login-heading">
                <h2>Sign Up</h2>
                </div>
                <hr id="line"></hr>
                    <form id="signupForm">
                    <div id="nameDiv" className="signupForm-elements">
                            <input type="text" 
                            id="name"
                            name="name"
                                    onChange={this.handleonChangeName}
                                    required/>
                            <label>Enter Name</label><br/>
                        </div>
                    <div id="genderDiv" className="signupForm-elements">
                        <select id="gender" name="gender" onChange={this.handleonChangeGender}>
                                <option value="">Select Gender</option>
                                <option value = "Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <br/>
                        </div>
                        <div id="mobileDiv" className="signupForm-elements">
                            <input type="text"
                            id="mobile"
                            name="mobile"
                                    onChange={this.handleonChangeMobile}
                                        required/>
                            <label>Enter Mobile Number</label><br/>
                        </div>
                        <div id="emailDiv" className="signupForm-elements">
                            <input type="text" 
                            id="email"
                            name="email"
                                    onChange={this.handleonChangeEmail}
                                    required/>
                            <label>Enter Email Id</label><br/>
                        </div>
                        <div id="passwordDiv" className="signupForm-elements">
                        <input type="password" 
                            id="password"
                            name="password"
                                onChange={this.handleonChangePassword}
                                required />
                            <label>Enter Password</label><br/>
                            <i onClick={this.handlePasswordDisplay} id="password-eye" class="fas fa fa-eye"></i>
                        </div>
                        <div id="confirmPasswordDiv" className="signupForm-elements">
                        <input type="password" 
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={this.handleOnchange}
                                required/>
                        <label>Confirm Password</label><br/>
                        </div>
                        <div>
                        <button onClick={this.handleSubmit} type="submit">Submit</button>
                        </div><span id="passwordMatch">Password does not match</span>
                        <span id="formatMatch">Please Enter inputs in proper format</span>
                    </form>
                    <div id="alternative">
                        <p>Already a member?&nbsp;&nbsp;</p>
                        
                            <h4 onClick={this.handleRedirectToLogin}><span id="log-text">LOG&nbsp;</span>IN</h4>
                    
                    </div>
                </div>
        )
    }
}

 const mapDispatchToProps = (dispatch) =>{
     return{
         onToggle: (data)=> dispatch(toggleSignupLogin(data)),
         onCreate: (data)=> dispatch(CreateUser(data)),
        onChangeName : ()=>dispatch(onChangeName()),
        onChangeEmail : ()=> dispatch(onChangeEmail()),
        onChangeMobile : () =>dispatch(onChangeMobile()),
        onChangeGender : ()=>dispatch(onChangeGender()),
        onChangePassword : ()=> dispatch(onChangePasswordStrength()),
     };
 }

export default connect(null,mapDispatchToProps)(Signup);