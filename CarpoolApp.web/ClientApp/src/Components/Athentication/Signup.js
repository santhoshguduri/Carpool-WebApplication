import React,{Component} from 'react';
import { connect } from 'react-redux';
import { store } from '../../Redux/Store';
import { toggleSignupLogin } from '../../Redux/Actions/AuthenticationActions';
import { CreateUser } from '../../Redux/Services/AccountManagementServices';
import {onChangeName, onChangeEmail, onChangeMobile, onChangeGender, onChangePasswordStrength, onSubmitValidation} from './validations'


class Signup extends Component{
    
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
        const name = document.getElementById("name").value;
        const gender =  document.getElementById("gender").value;
        const mobileno =  document.getElementById("mobile").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
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


    handleRedirectToLogin = () =>{
        
        this.props.onToggle(true);
    }

    handleonChangeName = () =>{
        this.props.onChangeName();
    }

    handleonChangeEmail = () =>{
        this.props.onChangeEmail();
    }

    handleonChangeMobile = () =>{
        this.props.onChangeMobile();
    }

    handleonChangeGender = () =>{
        this.props.onChangeGender();
    }

    handleonChangePassword = () =>{
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
                                    onChange={this.handleonChangeName}
                                    required/>
                            <label>Enter Name</label><br/>
                        </div>
                        <div id="genderDiv" className="signupForm-elements">
                            <select id="gender" onChange={this.handleonChangeGender}>
                                <option value="">Select Gender</option>
                                <option value = "Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <br/>
                        </div>
                        <div id="mobileDiv" className="signupForm-elements">
                            <input type="text"
                                    id="mobile"
                                    onChange={this.handleonChangeMobile}
                                        required/>
                            <label>Enter Mobile Number</label><br/>
                        </div>
                        <div id="emailDiv" className="signupForm-elements">
                            <input type="text" 
                                    id="email"
                                    onChange={this.handleonChangeEmail}
                                    required/>
                            <label>Enter Email Id</label><br/>
                        </div>
                        <div id="passwordDiv" className="signupForm-elements">
                        <input type="password" 
                                id="password" 
                                onChange={this.handleonChangePassword}
                                required />
                            <label>Enter Password</label><br/>
                            <i onClick={this.handlePasswordDisplay} id="password-eye" class="fas fa fa-eye"></i>
                        </div>
                        <div id="confirmPasswordDiv" className="signupForm-elements">
                        <input type="password" 
                                id="confirmPassword"
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