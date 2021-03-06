import React,{Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { AuthenticateUser } from '../../Redux/Services/AuthenticationServices';
import { toggleSignupLogin } from '../../Redux/Actions/AuthenticationActions';
import { store } from '../../Redux/Store';

class Login extends Component{
    constructor(props) {
        super(props);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const userName = this.state.email;
        const password = this.state.password;

        console.log(userName,password);
        this.props.userAuthentication(userName,password);
    }

    handleOnChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handlePasswordDisplay = () => {
        var inputElement = document.getElementById("password");
        if (inputElement.type === "password") {
            inputElement.type = "text";
        } else {
            inputElement.type = "password";
        }
      }

      handleRedirectToSignup = () =>{
        
        this.props.onToggle(false);
      }

    render(){
        return(
            <div id="login-page">
                <div id="login-heading">
                <h2>Log In</h2>
                </div>
                <hr id="line"></hr>
                    <form id="signupForm" >
                        <div className="signupForm-elements">
                        <input type="text"
                            onChange={this.handleOnChange}
                                    name="email"
                                    id = "email"
                                    defaultValue="" required/>
                            <label>Enter Email Id</label><br/>
                        </div>
                        <div className="signupForm-elements">
                        <input type="password"
                            onChange={this.handleOnChange}
                                    id="password"
                                    name="password"
                                    defaultValue="" required/>
                            <label>Enter Password</label><br/>
                            <i onClick={this.handlePasswordDisplay} id="password-eye" className="fas fa fa-eye"></i>
                        </div>
                        <div>
                        <button onClick={this.handleSubmit} type="submit">Submit</button>
                        </div>
                    </form>
                    <div id="alternative">
                        <p>Not a member yet?&nbsp;&nbsp;</p>
                        <h4 onClick={this.handleRedirectToSignup}><span id="log-text">SIGN&nbsp;</span>UP</h4>
                    </div><br></br>
                    {this.props.user.error !== ''?
                    <h5 style={{color:"red"}}>Username or Password is incorrect</h5>:<React.Fragment></React.Fragment>}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        user : state.authenticate
    }
}

 const mapDispatchToProps = (dispatch) =>{
     return{
         onToggle: (data)=> dispatch(toggleSignupLogin(data)),
         userAuthentication: (username,password)=> dispatch(AuthenticateUser(username,password))
     };
 }

export default connect(mapStateToProps,mapDispatchToProps)(Login);