import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter,
    Switch
}from 'react-router-dom';

//  estilos
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/buttons.css';
import './assets/css/index.css';
import './assets/css/style.css';
import './assets/css/admin.css';
import './assets/css/preloader.css';

//  layouts
import Home from './layouts/home-principal';
import Inicio from './layouts/home-admin';
import SignUpIn from './layouts/home-signup-singin';

//  iconos
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faHome, 
    faUsers,
    faUserTie, 
    faBeer, 
    faRoute, 
    faCalendar, 
    faClock, 
    faTimes,
    faPlus,
    faShoppingCart, 
    faUserAlt, 
    faSignOutAlt,
    faTrashAlt,
    faCircle 
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHome, faUsers, faBeer, faRoute, faCalendar, faClock, faTimes,
    faUserTie, faPlus, faShoppingCart, faUserAlt, faSignOutAlt, faTrashAlt,
    faCircle
    ) 
class Index extends Component{
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route path = '/admin' component = {Inicio} />
                    <Route path = '/login' component = {SignUpIn} />
                    <Route path = '/registro' component = {SignUpIn} />
                    <Route path = '/roboshot' component = {Home} />
                    <Route path = '/perfil' component = {Home} />
                </Switch>       
            </BrowserRouter>
        )
    }
}

export default Index;

if (document.getElementById('App')) {
    ReactDOM.render(<Index />, 
        document.getElementById('App'),
         
    );
}