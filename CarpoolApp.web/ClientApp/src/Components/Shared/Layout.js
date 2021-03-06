import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../NavigationBar/NavigationBar';

class Layout extends Component{
    render(){
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    {
                        this.props.children
                    }
                </Container>
            </div>
        )
    }
}

export default Layout;