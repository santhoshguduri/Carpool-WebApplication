import React,{Component, ChangeEvent} from 'react';
import { connect } from 'react-redux';
import { toggleSignupLogin } from '../../Redux/Actions/AuthenticationActions';
import { CreateUser } from '../../Redux/Services/AccountManagementServices';
import {onChangeName, onChangeEmail, onChangeMobile, onChangeGender, onChangePasswordStrength} from './validations'
import { Dispatch, AnyAction } from 'redux';

interface IProps{
    onToggle:(toggle:boolean)=>void,
    onCreate : (user : IUser) => void,
    onChangeName : () => void,
    onChangeEmail : () => void,
    onChangePassword : () => void,
    onChangeGender : () => void,
    onChangeMobile : () => void
}

export interface IUser{
    name:string,
    gender:string,
    mobile:string,
    email:string,
    username:string,
    password:string,
}

interface IState extends IUser{
    confirmPassword:string
}

interface IDispatchProps{
        onToggle: (data : boolean)=> void,
        onCreate: (data :IUser)=> void,
        onChangeName : () => void,
        onChangeEmail : () => void,
        onChangeMobile : () =>void,
        onChangeGender : () =>void,
        onChangePassword : () => void,
}

class Signup extends Component<IProps,IState>{
    constructor(props:IProps) {
        super(props);
    }
    
    handlePasswordDisplay = () =>{
        
        var inputElement  = document.getElementById("password")! as HTMLInputElement;
        if (inputElement.type  === "password") {
            inputElement.type = "text";
        } else {
            inputElement.type = "password";
        }
    }

    handleSubmit = (e : any) =>{
        e.preventDefault();
        const name = this.state.name;
        const gender = this.state.gender;
        const mobile = this.state.mobile;
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        if(password==confirmPassword && password !=''){
        const user : IUser={
            name,
            gender,
            mobile,
            email,
            username,
            password
        }
        this.props.onCreate(user);
        this.handleRedirectToLogin();
        console.log(user);
        }
        else if(password != confirmPassword){
            var passwordConfirmationElement = document.getElementById("confirmPassword")!;
            passwordConfirmationElement.style.border="2px solid red";
            var warningElement = document.getElementById('passwordMatch')!;
            warningElement.style.display="block";
        }
        else if(name==' '|| mobile==''||gender==''||email==''||password==''){
            var formatWarning = document.getElementById('formatMatch')!;
            formatWarning.style.display="block";
        }
        }

    handleOnchange = (event : any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleRedirectToLogin = () => {
        
        this.props.onToggle(true);
    }

    handleonChangeName = (e : ChangeEvent) => {
        this.handleOnchange(e);
        this.props.onChangeName();
    }

    handleonChangeEmail = (e : ChangeEvent) => {
        this.handleOnchange(e);
        this.props.onChangeEmail();
    }

    handleonChangeUsername = (e : ChangeEvent) => {
        this.handleOnchange(e);
    }

    handleonChangeMobile = (e : ChangeEvent) => {
        this.handleOnchange(e);
        this.props.onChangeMobile();
    }

    handleonChangeGender = (e : ChangeEvent) => {
        this.handleOnchange(e);
        this.props.onChangeGender();
    }

    handleonChangePassword = (e : ChangeEvent) => {
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
                        <div id="usernameDiv" className="signupForm-elements">
                            <input type="text" 
                            id="username"
                            name="username"
                                    onChange={this.handleonChangeUsername}
                                    required/>
                            <label>Enter Preffered Username</label><br/>
                        </div>
                        <div id="passwordDiv" className="signupForm-elements">
                        <input type="password" 
                            id="password"
                            name="password"
                                onChange={this.handleonChangePassword}
                                required />
                            <label>Enter Password</label><br/>
                            <i onClick={this.handlePasswordDisplay} id="password-eye" className="fas fa fa-eye"></i>
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

 const mapDispatchToProps = (dispatch : any) : IDispatchProps =>{
     return{
         onToggle: (data : boolean)=> dispatch(toggleSignupLogin(data)),
         onCreate: (data : IUser)=> dispatch(CreateUser(data)),
        onChangeName : ()=>dispatch(onChangeName()),
        onChangeEmail : ()=> dispatch(onChangeEmail()),
        onChangeMobile : () =>dispatch(onChangeMobile()),
        onChangeGender : ()=>dispatch(onChangeGender()),
        onChangePassword : ()=> dispatch(onChangePasswordStrength()),
     };
 }

export default connect<null,IDispatchProps>(null,mapDispatchToProps)(Signup);