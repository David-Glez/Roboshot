import React, {useState} from 'react';

//  toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  navegation
import {Switch, Route} from 'react-router-dom';

//  componentes
import UsersTable from '../../components/admin/tables/users-table';
import UsersAdd from '../../components/admin/forms/users-register-form';
import UsersUpdate from '../../components/admin/forms/users-edit-form';
import UsersDelete from '../../components/admin/modales/users-delete-modal';

const UsersAdmin = (props) => {
    
    const [eliminarUsuario, setEliminarUsuario] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);
    const [nombre, setNombre] = useState('');
    const [razon, setRazon] = useState('');

    //  abre el modal
    const abrirModalEliminar = (id, nombre, razon) => {
        setIdUsuario(id);
        setNombre(nombre);
        setRazon(razon)
        setEliminarUsuario(true);
    }

    //  cerrar el modal
    const cerrarModalEliminar = () => {
        setIdUsuario(0);
        setNombre('');
        setRazon('')
        setEliminarUsuario(false);
        props.history.push('/admin');
    }

    return(
        <>
        <ToastContainer />
        <div className = 'content'>
            <div className = 'row'>
                <div className = 'col-md-12'>
                    <Switch>
                        <Route exact path = '/admin/usuarios'>
                            <UsersTable 
                                abrirModalDelete = {(e, i, r) => abrirModalEliminar(e, i, r)}
                            />
                        </Route>
                        <Route exact path = '/admin/usuarios/anadir' component = {UsersAdd} />
                        <Route exact path = '/admin/usuarios/editar' component = {UsersUpdate} />
                    </Switch>
                </div>
            </div>
        </div>
        <UsersDelete 
            activo = {eliminarUsuario}
            inactivo = {(e) => cerrarModalEliminar(e)}
            id = {idUsuario}
            nombre = {nombre}
            razon = {razon}
        />
        </>
    )
};

export default UsersAdmin;

