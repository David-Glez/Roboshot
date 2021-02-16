import React, {useState, useEffect} from 'react';

import {
    Route,
    Switch,
    Redirect
}from 'react-router-dom';

//  componentes
import Sidebar from '../components/admin/sidebar/sidebar';
import AdminNavBar from '../components/admin/navbar/navbar';
import LogOutModal from '../components/admin/modales/general-logout-modal';
import LoadingModal from '../components/admin/modales/general-loading-modal'
//import AdminFooter from '../admin/admin-components/footer/footer';

//  toast
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  vistas
import DashBoard from '../views/admin/dashboard';
import UsersAdmin from '../views/admin/users';
import RoboshotsAdmin from '../views/admin/roboshots';
import RecipesAdmin from '../views/admin/recipes';

//bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

//servicio de autenticacion
import AuthService from '../services/auth/autenticacion';
import UserService from '../services/auth/servicioUsuarios';

function Inicio(props){

    const [rutas, setRutas] = useState([]);
    const [logueado, setLogueado] = useState(true);
    const [loading, setLoading] = useState(true);
    const [modalLog, setModalLog] = useState(false);
    const [cards, setCards] = useState([]);
    const [modalLoading, setModalLoading] = useState(true);
    const [user, setUser] = useState({
        id: 0,
        idRol: 0,
        usuario: '',
        rol: '',
        autorizado: null
    });

    //carga del state
    useEffect(()=>{
        //  datos en localstorage
        const resp = AuthService.getCurrentUser();
        if(resp != null){
            if(resp.idRol == 4){
                setLogueado(false)
            }
            setUser({
                id: resp.id,
                idRol: resp.idRol, 
                usuario: resp.usuario,
                rol: resp.rol,
                autorizado: resp.autorizado
            })
            setLoading(false)
        }else{
            setLogueado(false)
        }

        //  datos de la API
        const inicio = async() =>{
            const routes = await UserService.rutasRol();
            const statsCards =  await UserService.statsCard();
            if(routes && statsCards){
                setRutas(routes.data);
                setLoading(false);
                setModalLoading(false);
                setCards(statsCards.data)
            }
        }
        inicio();
    }, [])

    //cerrar sesion
    const logOut = () => {
        setModalLog(true);
        const salir = AuthService.logout();
        salir.then(resp => {
            if(resp.data.status){
                setRutas([]);
                setUser({
                    id: 0,
                    idRol: 0,
                    usuario: '',
                    rol: '',
                    autorizado: null
                })
                setModalLog(false)
                props.history.push('/')
            }
        })
    };

    //  texto del navbar
    const getBrandText = () => {
        return props.location.pathname;
    }

    if(logueado){
        return(
            <>
            <ToastContainer />
            <div className = 'wrapperAdmin'>
                <Sidebar 
                    rutas = {rutas}
                    loading = {loading}
                    usuario = {user.usuario}
                    rol = {user.rol}
                    autorizado = {user.autorizado}
                />
                <div className = 'mainPanel' id = 'mainPanel'>
                    <AdminNavBar
                        brandText = {getBrandText()} 
                        logout = {(e) => logOut(e)}
                    />
                    <Switch>
                        <Route exact path = '/admin'>
                            <DashBoard
                                loading = {loading}
                                cards = {cards} 
                            />
                        </Route>
                        <Route exact path = '/admin/usuarios' component = {UsersAdmin} />
                        <Route exact path = '/admin/usuarios/anadir'component = {UsersAdmin} />
                        <Route exact path = '/admin/usuarios/editar' component = {UsersAdmin} />
                        <Route exact path = '/admin/roboshots' component = {RoboshotsAdmin} />
                        <Route exact path = '/admin/roboshots/anadir' component = {RoboshotsAdmin} />
                        <Route exact path = '/admin/roboshots/editar' component = {RoboshotsAdmin} />
                        <Route exact path = '/admin/recetas' component = {RecipesAdmin} />
                        <Route exact path = '/admin/recetas/editar' component = {RecipesAdmin} />
                    </Switch>
                    
                </div>
            </div>
            <LogOutModal
                ver = {modalLog} 
            />
            <LoadingModal
                ver = {modalLoading}
            />
            </>
        )
    }else{
        return <Redirect to='/login' />
    }
}

export default Inicio;