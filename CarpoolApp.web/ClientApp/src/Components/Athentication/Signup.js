import React,{ useContext, useState} from 'react';
import { CreateUser } from '../../Services/AccountManagementServices';
import { UserContext } from '../../Store/Context/UserContext';
import { toggleSignupLogin } from '../../Store/Actions/AuthenticationActions';
import { onChangeName, onChangeEmail, onChangeMobile, onChangeGender, onChangePasswordStrength } from './validations';


function Signup() {
    
    const userContext = useContext(UserContext);

    const [user,setUser] = useState({});

    const handlePasswordDisplay = () =>{
        var inputElement = document.getElementById("password");
        if (inputElement.type === "password") {
            inputElement.type = "text";
        } else {
            inputElement.type = "password";
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const name = user.name;
        const gender = user.gender;
        const mobileno = user.mobile;
        const email = user.email;
        const password = user.password;
        const confirmPassword = user.confirmPassword;
        if(password==confirmPassword && password !=''){
        const person={
            name,
            gender,
            mobileno,
            email,
            password
        }
        CreateUser(person);
        handleRedirectToLogin();
        console.log(person);
        }
        else if(password != confirmPassword){
            document.getElementById("confirmPassword").style.border="2px solid red"
            document.getElementById('passwordMatch').style.display="block";
        }
        else if(name==' '|| mobileno==''||gender==''||email==''||password==''){
            document.getElementById('formatMatch').style.display="block";
        }
        }

    const handleOnchange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleRedirectToLogin = (e) => {
        
        userContext.userDispatch(toggleSignupLogin(true));
    }

    const handleonChangeName = (e) => {
        handleOnchange(e);
        onChangeName();
    }

    const handleonChangeEmail = (e) => {
        handleOnchange(e);
        onChangeEmail();
    }

    const handleonChangeMobile = (e) => {
        handleOnchange(e);
        onChangeMobile();
    }

    const handleonChangeGender = (e) => {
        handleOnchange(e);
        onChangeGender();
    }

    const handleonChangePassword = (e) => {
        handleOnchange(e)
        onChangePasswordStrength();
    }

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
                                    onChange={handleonChangeName}
                                    required/>
                            <label>Enter Name</label><br/>
                        </div>
                    <div id="genderDiv" className="signupForm-elements">
                        <select id="gender" name="gender" onChange={handleonChangeGender}>
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
                                    onChange={handleonChangeMobile}
                                        required/>
                            <label>Enter Mobile Number</label><br/>
                        </div>
                        <div id="emailDiv" className="signupForm-elements">
                            <input type="text" 
                            id="email"
                            name="email"
                                    onChange={handleonChangeEmail}
                                    required/>
                            <label>Enter Email Id</label><br/>
                        </div>
                        <div id="passwordDiv" className="signupForm-elements">
                        <input type="password" 
                            id="password"
                            name="password"
                                onChange={handleonChangePassword}
                                required />
                            <label>Enter Password</label><br/>
                            <i onClick={handlePasswordDisplay} id="password-eye" class="fas fa fa-eye"></i>
                        </div>
                        <div id="confirmPasswordDiv" className="signupForm-elements">
                        <input type="password" 
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleOnchange}
                                required/>
                        <label>Confirm Password</label><br/>
                        </div>
                        <div>
                        <button onClick={handleSubmit} type="submit">Submit</button>
                        </div><span id="passwordMatch">Password does not match</span>
                        <span id="formatMatch">Please Enter inputs in proper format</span>
                    </form>
                    <div id="alternative">
                        <p>Already a member?&nbsp;&nbsp;</p>
                        
                            <h4 onClick={handleRedirectToLogin}><span id="log-text">LOG&nbsp;</span>IN</h4>
                    
                    </div>
                </div>
        )
}


export default Signup;