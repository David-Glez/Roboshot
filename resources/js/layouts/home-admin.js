import React, {useState, useEffect} from 'react';

import {
    Route,
    Switch,
    Redirect
}from 'react-router-dom';

//  componentes
import Sidebar from '../components/admin/sidebar/sidebar';
import AdminNavBar from '../components/admin/navbar/navbar';
//import AdminFooter from '../admin/admin-components/footer/footer';

//  vistas
import DashBoard from '../views/admin/dashboard';
import UsersAdmin from '../views/admin/users';


//bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

//servicio de autenticacion
import AuthService from '../services/auth/autenticacion';

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