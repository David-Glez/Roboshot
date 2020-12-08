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
import './css/preloader.css';


//  componentes
import Home from './components/home';
import Inicio from './components/admin/index';
import Login from './components/auth/login';
import Register from './components/auth/register';

class Index extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route path = '/admin' component = {Inicio} />
                    <Route path = '/login' component = {Login} />
                    <Route path = '/registro' component = {Register} />
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