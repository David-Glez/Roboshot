import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const RoboshotsTableButtons = (props) => {
    const id = props.id;
    const nombre = props.nombre;
    const cliente = props.cliente;

    //  abrir modal de eliminar usuario
    const modalEliminar = (e, id, nombre, cliente) => {
        e.preventDefault();
        props.abrirModal(id, nombre, cliente)
    }

    return(
        <>
        <Link 
            to = {{
                pathname: '/admin/roboshots/editar',
                idRob: id
            }}
            className = 'btn btn-outline-secondary'
        >
            <FontAwesomeIcon icon = {faEdit} />
        </Link>
        <a onClick = {(e) => modalEliminar(e, id, nombre, cliente)} className = 'btn btn-outline-danger'>
            <FontAwesomeIcon icon = {faTrashAlt} />   
        </a>
        </>
    )
}

export default RoboshotsTableButtons;