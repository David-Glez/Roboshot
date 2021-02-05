import React, {useState, useEffect} from 'react';

//  navegacion
import {Switch, Route} from 'react-router-dom';

//  toast
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import HeaderSign from '../components/principal/header/header-sign';
import SignInForm from '../components/principal/forms/sign-in-form';
import SignUpForm from '../components/principal/forms/sign-up-form';

const SignUpIn = (props) => {
    return(
        <>
        <ToastContainer />
        <HeaderSign />
        <div className = 'container mt-3'>
            <div className = 'row'>
                <div className = 'col-md-5'>
                    <Switch>
                        <Route exact path = '/registro'>
                            <SignUpForm 
                                history = {props.history}
                            />
                        </Route>
                        <Route exact path = '/login'>
                            <SignInForm 
                                history = {props.history}
                            />
                        </Route>
                    </Switch>
                </div>
                <div className = 'col-md-7'>
                    Aqui va la publicidad
                </div>
            </div>
        </div>
        
        </>
    )
}

export default SignUpIn;