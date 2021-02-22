import React from 'react';
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

//  custom hook
import useAdminLayout from '../hooks/admin/layout/layout-hook';

function Inicio(props){

    //cerrar sesion
    const closed = () => {
        //  logOut()
        console.log('do something')
    };

    const {userData, layout, logOut} = useAdminLayout();
    console.log(userData, layout)

    //  texto del navbar
    const getBrandText = () => {
        return props.location.pathname;
    }

    if(layout.admin){
        return(
            <>
            <ToastContainer />
            <div className = 'wrapperAdmin'>
                <Sidebar 
                    rutas = {layout.routes}
                    loading = {layout.loading}
                    usuario = {userData.usuario}
                    rol = {userData.rol}
                    autorizado = {userData.autorizado}
                />
                <div className = 'mainPanel' id = 'mainPanel'>
                    <AdminNavBar
                        brandText = {getBrandText()} 
                        logout = {(e) => closed(e)}
                    />
                    <Switch>
                        <Route exact path = '/admin'>
                            <DashBoard
                                loading = {layout.loading}
                                cards = {layout.cards} 
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
                ver = {layout.logout} 
            />
            <LoadingModal
                ver = {layout.loading}
            />
            </>
        )
    }else{
        return <Redirect to='/login' />
    }
}

export default Inicio;