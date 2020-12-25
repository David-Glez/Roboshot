import React, {useState} from 'react';

//  toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  navegation
import {Switch, Link, Route} from 'react-router-dom';

//  componentes
import UsersTable from '../../components/admin/users/users-table';
import UsersAdd from '../../components/admin/users/users-form';
import UsersUpdate from '../../components/admin/users/users-update';
import UsersDelete from '../../components/admin/users/users-delete';

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
        props.history.push('/admin/usuarios');
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

