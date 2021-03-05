import React, {useState, useEffect} from 'react';
import {
    Route,
    Switch
}from 'react-router-dom'; 
 
//  URL's API
import Accion from '../services/conexion';
import AuthService from '../services/auth/autenticacion';

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Header from '../components/principal/header/header';
import ModalReceta from '../components/principal/modales/receta';
import ModalManual from '../components/principal/modales/manual';
import ModalCarrito from '../components/principal/modales/carrito';
import ModalCodigo from '../components/principal/modales/codigo';
import ModalUsuario from '../components/principal/modales/datos-usuario';
import ModalPedido from '../components/principal/modales/pedido';

//  vistas
import RoboshotCard from '../views/principal/roboshots';
import Recipe from '../views/principal/recetas';
import Perfil from '../views/principal/perfil-usuario';

import {useHomeDispatch, useHomeState, closeModalSwitch} from '../context';

function Home(props){

    const settings = useHomeState();
    const dispatch = useHomeDispatch();

    //  notifications and actions in case error
    useEffect(() => {
        if(settings.success){
            switch(settings.successCode){
                case 104:
                    closeModalSwitch(dispatch)
                    successToast(settings.message)
                    dispatch({type: 'CLEAR_SUCCESS'})
                    break;
                case 105:
                    successToast(settings.message);
                    dispatch({type: 'CLEAR_SUCCESS'})
                    break;
                case 107:
                    console.log(settings.message);
                    break;
                case 112:
                    dispatch({type: 'CLEAR_SUCCESS'})
                    break;
            }
        }
        if(settings.error){
            switch(settings.errorCode){
                case 101:
                    //  redirecciona a / en el caso de que /roboshot de error 500
                    props.history.push('/')
                    dispatch({type: 'CLEAR_ERROR'})
                    break;
                case 102:
                    //  en el caso de que la bebida personalizada no tenga ingredientes
                    errorToast(settings.errorMessage)
                    dispatch({type: 'CLEAR_ERROR'})
                    break;
                case 103: 
                    //  en el caso de que la bebida exceda sus dimensiones
                    errorToast(settings.errorMessage)
                    dispatch({type: 'CLEAR_ERROR'})
                    break;
                case 108: 
                    //  el usuario realiza pedido sin estar logueado
                    errorToast(settings.errorMessage)
                    dispatch({type: 'CLEAR_ERROR'})
                    break;
                case 109:
                    //  se realiza el pedido con el carrito vacio
                    errorToast(settings.errorMessage)
                    dispatch({type: 'CLEAR_ERROR'})
                    break;
            }
        }
    }, [settings])

    const errorToast = (message) => {
        toast.warning(message,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            draggable: true,
            pauseOnHover: true,
            progress: undefined
        });
    }

    const successToast = (message) => {
        toast(message,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            draggable: true,
            pauseOnHover: true,
            progress: undefined,
        });
    }

    return(
        <>
        <ToastContainer />
        
        <Header/>
        <div className = 'container'>
            <Switch>
                <Route exact path = '/' component = {RoboshotCard} />
                <Route exact path = '/roboshot' component = {Recipe} />
                <Route exact path = '/perfil' component = {Perfil} />
            </Switch>
        </div>
            <ModalUsuario />
            <ModalPedido />
            <ModalReceta />
            <ModalManual />
            <ModalCarrito />
            <ModalCodigo />
        </>
    )
    
}

export default Home;