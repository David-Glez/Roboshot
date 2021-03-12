import React, {useEffect} from 'react';
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

import {
    useAuthState, 
    useHomeState, 
    useHomeDispatch,
    useAuthDispatch,
    openModalSwitch,
    closeModalSwitch,
    getRoutesAndStateCards
} from '../context';

function Inicio(props){

    const settings = useHomeState();
    const userDetails = useAuthState();
    const homeDispatch = useHomeDispatch();
    const userDispatch = useAuthDispatch();

    useEffect(() => {
        openModalSwitch(homeDispatch, 'load_home', '');
        const home = async() => {
            try{
                const resp = await getRoutesAndStateCards()
                if(resp.status == 200){
                    userDispatch({
                        type: 'SETTINGS_CHARGED',
                        routes: resp.data.routes,
                        state_cards: resp.data.stateCards
                    })
                    closeModalSwitch(homeDispatch);
                }
            }catch(error){
                console.log(error)
            }
        }
        home();
    }, []);

    //  texto del navbar
    const getBrandText = () => {
        return props.location.pathname;
    }

    if(userDetails.id_rol == 1 || userDetails.id_rol == 2){
        return(
            <>
            <ToastContainer />
            <div className = 'wrapperAdmin'>
                <Sidebar />
                <div className = 'mainPanel' id = 'mainPanel'>
                    <AdminNavBar
                        brandText = {getBrandText()}
                    />
                    <Switch>
                        <Route exact path = '/admin' component = {DashBoard} />
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
            <LogOutModal />
            <LoadingModal />
            </>
        )
    }else{
        return <Redirect to='/login' />
    }
}

export default Inicio;