import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ClientAddButton = () => {

    return(
        <Link to = '/admin/usuarios/anadir' className = 'btn btn-primary float-right'>
            <FontAwesomeIcon icon={faPlus} />
            <span className = 'customSpan'>Añadir Cliente</span>
        </Link>
    )
}

export default ClientAddButton;