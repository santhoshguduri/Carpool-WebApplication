import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../NavigationBar/NavigationBar';

import {UserProvider} from '../../Store/Context/UserContext';
import {RideProvider} from '../../Store/Context/RidesContext';
import {CarProvider} from '../../Store/Context/CarContext';
import {BookingProvider} from '../../Store/Context/BookingContext';
import {AutocompleteProvider} from '../../Store/Context/AutocompleteContext';


export function Layout(props) {
        return(
            <div>
                <UserProvider>
                    <BookingProvider>
                        <RideProvider>
                            <CarProvider>
                                <AutocompleteProvider>
                                    <NavBar></NavBar>
                                    <Container>
                                    {
                                        props.children
                                    }
                                    </Container>
                                </AutocompleteProvider>
                            </CarProvider>
                        </RideProvider>
                    </BookingProvider>
                </UserProvider>
             
            </div>
        )
}
