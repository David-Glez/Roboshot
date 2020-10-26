import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter,
    Switch
}from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import './css/buttons.css';
import './css/index.css';
import './css/style.css';
import './css/admin.css';


//componentes
import Home from './components/home';
import Inicio from './components/admin/index';
import Login from './components/auth/login';

class Index extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route path = '/admin' component = {Inicio} />
                    <Route path = '/login' component = {Login} />
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