import React, {useState} from 'react';

//  navegation
import {Switch, Route} from 'react-router-dom';

//  API 
import UserService from '../../services/auth/servicioUsuarios';

//  toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import RoboshotsTable from '../../components/admin/tables/roboshots-table';
import RoboshotsAdd from '../../components/admin/forms/roboshots-register-form';
import RoboshotsDelete from '../../components/admin/modales/roboshots-delete-modal';
import RoboshotsUpdate from '../../components/admin/forms/roboshots-edit-form';

const RoboshotsAdmin = (props) => {

    const [eliminarRob, setEliminarRob] = useState(false);
    const [estacion, setEstacion] = useState({
        id: 0,
        nombre: '',
        cliente: ''
    })

    //  abre el modal
    const abrirModalEliminar = (id, nombre, cliente) => {
        setEstacion({
            id: id,
            nombre: nombre,
            cliente: cliente
        })
        setEliminarRob(true);
    }

    //  cerrar el modal
    const cerrarModalEliminar = () => {
        setEstacion({
            id: 0,
            nombre: '',
            cliente: ''
        })
        setEliminarRob(false);
        props.history.push('/admin/roboshots');
    }

    //  guardar datos de roboshot
    const nuevo = (data) => {
        const resp = UserService.anadirRoboshot(data);
        resp.then((response) => {
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
                    onClose: () => cerrar()
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
                return false
            }
            
        })
        
    }

    //  editar roboshot
    const editar = (data) => {
        
        const envio = UserService.editarRoboshot(data)
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
                    onClose: () => cerrar()
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
                return false
            }

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
                                abrirModalDelete = {(e, i , r) => abrirModalEliminar(e, i ,r)} 
                            />
                        </Route>
                        <Route exact path = '/admin/roboshots/anadir'>
                            <RoboshotsAdd 
                                nuevoRob = {(e) => nuevo(e)}
                            />
                        </Route>
                        <Route exact path = '/admin/roboshots/editar' >
                            <RoboshotsUpdate
                                editar = {(e) => editar(e)}
                                location = {props.location} 
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>

        <RoboshotsDelete 
            activo = {eliminarRob}
            inactivo = {(e) => cerrarModalEliminar(e)}
            data = {estacion}
        />
        </>
    )

}

export default RoboshotsAdmin;