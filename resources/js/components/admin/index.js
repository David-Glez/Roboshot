import React, {useState, useEffect} from 'react';

import {
    Route,
    Switch,
    Redirect
}from 'react-router-dom';

//componentes
import Sidebar from '../admin/admin-components/sidebar/sidebar';
import AdminNavBar from '../admin/admin-components/navbar/navbar';
import AdminFooter from '../admin/admin-components/footer/footer';
import DashBoard from '../admin/views/dashboard';
import UsersAdmin from '../admin/views/users';
import Roboshot from './roboshot/home';
import AnadirRoboshot from './roboshot/anadirRoboshot';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

//bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';

//servicio de autenticacion
import AuthService from '../../services/auth/autenticacion';

function Inicio(props){

    const [usuario, setUsuario] = useState(undefined);
    const [logueado, setLogueado] = useState(true);
    const [rol, setRol] = useState(false);
    const [clase, setClase] = useState(false);

    //carga del state
    useEffect(()=>{
        const inicio = async() =>{
            
            //const result = await AuthService.sessionLive();
            //console.log(result);
            //if(result.data == true){
                const user = AuthService.getCurrentUser();
                if(user){
                    setUsuario(user);
                    if(user.idRol == 1){
                        setRol(true);
                    }
                }
            /*}else{
                //const salir = AuthService.logout();
                //setLogueado(false);
            }*/
        }
        inicio();
    }, [])

    //cerrar sesion
    const logOut = () => {
        AuthService.logout();
    };

    //  texto del navbar
    const getBrandText = () => {
        return props.location.pathname;
    }

    if(logueado){
        return(
            <>
            <div className = 'wrapperAdmin'>
                <Sidebar idRol ={rol} clase ={clase}/>
                <div className = 'mainPanel' id = 'mainPanel'>
                    <AdminNavBar
                        brandText = {getBrandText()} 
                    />
                    <Switch>
                        <Route exact path = '/admin' component = {DashBoard} />
                        <Route exact path = '/admin/usuarios' component = {UsersAdmin} />
                        <Route exact path = '/admin/usuarios/anadir' component = {UsersAdmin} />
                        <Route exact path = '/admin/usuarios/editar' component = {UsersAdmin} />
                        <Route exact path = '/admin/roboshot' component = {Roboshot} />
                        <Route exact path = "/admin/roboshot/anadir" component = {AnadirRoboshot} />
                    </Switch>
                    <AdminFooter />
                </div>
            </div>

            </>
        )
    }else{
        return <Redirect to='/login' />
    }
}

export default Inicio;