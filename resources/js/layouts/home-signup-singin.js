import React, {useState, useEffect} from 'react';

//  API
import AuthService from '../services/auth/autenticacion';

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

    
    //  validacion inicio de sesion
    const logIn = (credenciales) => {
        const envio = AuthService.login(credenciales);
        envio.then((response) => {
            if(response.autorizado){
                switch(response.idRol){
                    case 1:
                        props.history.push('/admin');
                    break;
                    case 2:
                        console.log('En construccion');
                    break;
                    case 4:
                        props.history.push('/');
                    break;
                }
            }else{
                let error = 'Usuario y/o contraseña incorrectos';
                toast.warning(error,{
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
                return false;
            }
        })
    }

    //  funcion para registrar al usuario
    const registrarUsuario = (datos) => {
        const envio = AuthService.registrar(datos);
        envio.then((response) => {
            if(response.data.status){
                toast.success(response.data.mensaje,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined,
                    onClose: () => cerrarToast()
                });
            }else{
                let mensajes = response.data.mensaje;
                mensajes.forEach((item) => {
                    toast.warning(item,{
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
                });
                return false;
            }
        })       
    }

    //  cerrar toast
    const cerrarToast = () =>{
        props.history.push('/');
    };


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
                                registrar = {(e) => registrarUsuario(e)}
                            />
                        </Route>
                        <Route exact path = '/login'>
                            <SignInForm 
                                logIn = {(e) => logIn(e)}
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