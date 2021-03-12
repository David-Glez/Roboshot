import React from 'react';
//  navegacion
import {Link} from 'react-router-dom';

//  logo
import logo from '../../../assets/img/roboshot-logo-1.png'

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//  components
import ItemSidebar from './sidebar-list-item';
import {useAuthState} from '../../../context';

const Sidebar = (props) => {
    const userDetails = useAuthState();
    
    return(
        <>
        <div
            id = "sidebar"
            className = "sidebarAdmin"
            data-color = 'black'
        >
            <div className = 'logo '>
                <Link to = '/admin' className="simple-text text-center">
                    <img src={logo} id='logoAdmin' className = 'logoAdmin'/>
                </Link>
            </div>
            <div className = 'infoUser '>
                <p>Usuario: {userDetails.user}</p>
                <p>Rol: {userDetails.rol}</p>
                <small>
                    <FontAwesomeIcon 
                        icon = 'circle' 
                        className = {userDetails.access ? 'text-success' : 'text-warning'} 
                    />
                    <span className = 'customSpanAdmin'>
                        {userDetails.access ? 'Activo' : 'En espera'}
                    </span>
                </small>
            </div>
            <div className="sidebarAdmin-wrapper">
                <ul className ='navAdmin'>
                    <li className = ''>
                        <Link to = '/admin' className = 'nav-link'>
                            <FontAwesomeIcon icon = 'home' />
                            <span className = 'customSpanAdmin'>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    {(userDetails.routes != undefined) && (
                        <>
                        {userDetails.routes.map((x) =>
                            <ItemSidebar
                                key = {x.idRuta}
                                nombre = {x.nombre}
                                ruta = {x.ruta}
                                icono = {x.icono}
                            /> 
                        )}
                        </>
                    )}
                </ul>
            </div>
        </div>
        </>
    );
};

export default Sidebar;