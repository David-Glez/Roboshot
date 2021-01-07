import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RoboshotsAddButton = () => {

    return(
        <Link to = '/admin/roboshots/anadir' className = 'btn btn-primary float-right'>
            <FontAwesomeIcon icon = 'plus' />
            <span className = 'customSpan'>Añadir Roboshot</span>
        </Link>
    )
}

export default RoboshotsAddButton;