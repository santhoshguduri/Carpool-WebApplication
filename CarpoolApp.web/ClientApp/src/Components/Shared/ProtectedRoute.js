import React,{ Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

class ProtectedRoute extends Component{
    
    render(){
        const Component = this.props.component;
        const data = JSON.parse(sessionStorage.getItem('authorized'));
        return data!=null && data.token!=''? (
            <Component/>
        ) : (
        <Redirect to={{pathname:'/'}} />)
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated : state.authenticate.isAuthenticated
    }
}
export default connect(mapStateToProps)(ProtectedRoute);