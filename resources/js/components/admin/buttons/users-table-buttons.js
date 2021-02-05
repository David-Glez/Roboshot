import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UsersTableButtons = (props) => {
    const id = props.id;
    const nombre = props.nombre;
    const razon = props.razonSocial;

    //  abrir modal de eliminar usuario
    const modalEliminar = (e, id, nombre, razon) => {
        e.preventDefault();
        props.abrirModal(id, nombre, razon)
    }

    return(
        <>
        <Link 
            to = {{
                pathname: '/admin/usuarios/editar',
                idUsuario: id
            }}
            className = 'btn btn-outline-secondary'
        >
            <FontAwesomeIcon icon = {faEdit} />
        </Link>
        <a onClick = {(e) => modalEliminar(e, id, nombre, razon)} className = 'btn btn-outline-danger'>
            <FontAwesomeIcon icon = {faTrashAlt} />   
        </a>
        </>
    )
}

export default UsersTableButtons;