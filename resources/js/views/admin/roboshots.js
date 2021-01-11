import React, {useState} from 'react';

//  navegation
import {Switch, Route} from 'react-router-dom';

//  API 
import UserService from '../../services/auth/servicioUsuarios';

//  toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import RoboshotsTable from '../../components/admin/tables/roboshots-table';
import RoboshotsAdd from '../../components/admin/forms/roboshots-register-form';

const RoboshotsAdmin = (props) => {

    const [eliminarRob, setEliminarRob] = useState(false);

    //  abre el modal
    const abrirModalEliminar = () => {
        setEliminarRob(!eliminarRob);
        console.log(eliminarRob)
    }

    //  cerrar el modal
    const cerrarModalEliminar = () => {
        setEliminarRob(false);
        console.log(eliminarRob)
    }

    //  guardar datos de roboshot
    const nuevo = (data) => {
        const resp = UserService.anadirRoboshot(data);
        resp.then((response) => {
            console.log(response.data)
            toast.success('todo en orden',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined,
                //onClose: () => cerrar()
            });
            return false;
        })
        
    }

    const cerrar = () => {
        props.history.push('/admin/roboshots')
    }
    return(
        <>
        <div className = 'content'>
            <div className = 'row'>
                <div className = 'col-md-12'>
                    <Switch>
                        <Route exact path = '/admin/roboshots'>
                            <RoboshotsTable
                                abrirModalDelete = {(e) => abrirModalEliminar(e)} 
                            />
                        </Route>
                        <Route exact path = '/admin/roboshots/anadir'>
                            <RoboshotsAdd 
                                nuevoRob = {(e) => nuevo(e)}
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
        </>
    )

}

export default RoboshotsAdmin;