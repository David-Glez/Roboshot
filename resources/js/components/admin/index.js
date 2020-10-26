import React, {useState, useEffect} from 'react';

import {
    Route,
    Switch,
    Redirect
}from 'react-router-dom';

//componentes
import SideBar from './sidebar/sidebar';
import Home from './home/home';
import Roboshot from './roboshot/home';
import AnadirRoboshot from './roboshot/anadirRoboshot';
import ListaUsuarios from './usuarios/home';
import AnadirCliente from './usuarios/anadirCliente';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

//bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';

//servicio de autenticacion
import AuthService from '../../services/auth/autenticacion';

function Inicio(){

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
    }, []);

    //cambio de clase
    const cambioClase = () =>{
        setClase(!clase);
    };

    //cerrar sesion
    const logOut = () => {
        AuthService.logout();
      };

    if(logueado){
        return(
            <>
            <div className = 'wrapper'>
                
                <SideBar idRol ={rol} clase ={clase}/>
                <div id = 'content'>
                <nav className = 'navbar navbar-expand-lg navbar-light bg-light'>
                    <ul className = 'navbar-nav'>
                        <li className = 'nav-item'>
                            <a href="#" onClick={cambioClase} id='sidebarCollapse' className = 'nav-link'>
                                <FontAwesomeIcon icon={faBars} />
                            </a>
                            
                        </li>
                    </ul>
                    <ul className = 'navbar-nav ml-auto'>
                        <li className = 'nav-item'>
                            <a href='/' onClick = {logOut}>
                                <div className = ' flexContainer'>
                                    <div>
                                        <FontAwesomeIcon icon = {faSignOutAlt} />
                                    </div>
                                    <div className = 'customSpan'>
                                        Cerrar Sesión
                                    </div> 
                                </div>
                            </a>
                            
                        </li>
                    </ul>
                </nav>
                    <Switch>
                        <Route exact path = '/admin' component = {Home} />
                        <Route exact path = '/admin/clientes' component = {ListaUsuarios} />
                        <Route exact path = '/admin/clientes/anadir' component = {AnadirCliente} />
                        <Route exact path = '/admin/roboshot' component = {Roboshot} />
                        <Route exact path = "/admin/roboshot/anadir" component = {AnadirRoboshot} />
                    </Switch>
                </div>
            </div>
            </>
        )
    }else{
        return <Redirect to='/login' />
    }
}

export default Inicio;