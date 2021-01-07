import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const RoboshotsTableButtons = (props) => {
    const id = props.id;
    const nombre = props.nombre;
    const cliente = props.cliente;

    return(
        <>
        <Link 
            to = {{
                pathname: '/admin/usuarios/editar',
                idUsuario: 0
            }}
            className = 'btn btn-outline-secondary'
        >
            <FontAwesomeIcon icon = {faEdit} />
        </Link>
        
        </>
    )
}

export default RoboshotsTableButtons;