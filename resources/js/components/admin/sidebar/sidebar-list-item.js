import React from 'react';

import {Link} from 'react-router-dom';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemSidebar = (props) => {

    const ruta = props.ruta;
    const nombre = props.nombre;
    const icono = props.icono;

    return(
        <>
        <li className = ''>
            <Link to = {ruta} className = 'nav-link'>
                <FontAwesomeIcon icon = {icono} />
                <span className = 'customSpanAdmin'>
                    {nombre}
                </span>
            </Link>
        </li>
        </>
    )

}

export default ItemSidebar;