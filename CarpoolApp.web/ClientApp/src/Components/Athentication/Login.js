import React,{useState, useContext} from 'react';
import { AuthenticateUser,toggle } from '../../Services/AuthenticationServices';
import { UserContext } from '../../Store/Context/UserContext';
import { toggleSignupLogin } from '../../Store/Actions/AuthenticationActions';

function Login() {

    const userContext = useContext(UserContext)

    const [authenticationDetails,setAuthenticationDetails] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(authenticationDetails);
        const userName = authenticationDetails.email;
        const password = authenticationDetails.password;

        console.log(userName,password);
        AuthenticateUser(userName,password,userContext);
    }

    const handleOnChange = (event) => {
        setAuthenticationDetails({
            ...authenticationDetails,
            [event.target.name]: event.target.value
        });
    }

    const handlePasswordDisplay = () => {
        var inputElement = document.getElementById("password");
        if (inputElement.type === "password") {
            inputElement.type = "text";
        } else {
            inputElement.type = "password";
        } 
    }

    const handleRedirectToSignup = () =>{
        userContext.userDispatch(toggleSignupLogin(false));
    }

    return(
            <div id="login-page">
                <div id="login-heading">
                <h2>Log In</h2>
                </div>
                <hr id="line"></hr>
                    <form id="signupForm" >
                        <div className="signupForm-elements">
                        <input type="text"
                            onChange={handleOnChange}
                                    name="email"
                                    id = "email"
                                    defaultValue="" required/>
                            <label>Enter Email Id</label><br/>
                        </div>
                        <div className="signupForm-elements">
                        <input type="password"
                            onChange={handleOnChange}
                                    id="password"
                                    name="password"
                                    defaultValue="" required/>
                            <label>Enter Password</label><br/>
                            <i onClick={handlePasswordDisplay} id="password-eye" className="fas fa fa-eye"></i>
                        </div>
                        <div>
                        <button onClick={handleSubmit} type="submit">Submit</button>
                        </div>
                    </form>
                    <div id="alternative">
                        <p>Not a member yet?&nbsp;&nbsp;</p>
                        <h4 onClick={handleRedirectToSignup}><span id="log-text">SIGN&nbsp;</span>UP</h4>
                    </div><br></br>
                    {userContext.userState.error !== ''?
                    <h5 style={{color:"red"}}>Username or Password is incorrect</h5>:<React.Fragment></React.Fragment>}
            </div>
        )
}

export default Login;