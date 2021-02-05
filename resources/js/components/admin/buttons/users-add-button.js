import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ClientAddButton = () => {

    return(
        <Link to = '/admin/usuarios/anadir' className = 'btn btn-primary float-right'>
            <FontAwesomeIcon icon = 'plus' />
            <span className = 'customSpan'>Añadir Cliente</span>
        </Link>
    )
}

export default ClientAddButton;