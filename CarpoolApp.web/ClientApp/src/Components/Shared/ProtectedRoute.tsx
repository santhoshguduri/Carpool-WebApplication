import React,{ Component, JSXElementConstructor } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

interface IProps {
    component : any
}

class ProtectedRoute extends Component<IProps>{
    constructor(props : IProps){
        super(props);
    }
    render(){
        const Component  = this.props.component;
        const data = JSON.parse(sessionStorage.getItem('authorized')!);
        return (data!=null || data != undefined) && data.token!=''? (
            <Component />
        ) : (
        <Redirect to={{pathname:'/'}} />)
    }
}

interface StateProps {
    isAuthenticated : boolean
}

const mapStateToProps = (state : any) :StateProps => {
    return{
        isAuthenticated : state.authenticate.isAuthenticated
    }
}
export default connect<StateProps>(mapStateToProps)(ProtectedRoute);