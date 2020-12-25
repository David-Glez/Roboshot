import React from 'react';
//  navegacion
import {Link} from 'react-router-dom';

//  logo
import logo from '../../../assets/img/roboshot-logo-1.png'

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faBeer } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {

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
            <div className="sidebarAdmin-wrapper">
                <ul className ='navAdmin'>
                    <li className = ''>
                        <Link to = '/admin' className = 'nav-link'>
                            <FontAwesomeIcon icon = {faHome} />
                            <span className = 'customSpanAdmin'>
                                Inicio
                            </span>
                        </Link>
                    </li>
                    <li className = ''>
                        <Link to = '/admin/usuarios' className = 'nav-link'>
                            <FontAwesomeIcon icon = {faUsers} />
                            <span className = 'customSpanAdmin'>
                                Usuarios
                            </span>
                        </Link>
                    </li>
                    <li className = ''>
                        <Link to = '/admin/usuarios' className = 'nav-link'>
                            <FontAwesomeIcon icon = {faBeer} />
                            <span className = 'customSpanAdmin'>
                                Roboshots
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
};

export default Sidebar;