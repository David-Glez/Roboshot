import React from 'react';
import beer from '../../../img/beer.svg';
import logo from '../../../img/roboshot-logo-1.png'

//iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faBeer } from "@fortawesome/free-solid-svg-icons";

import {Link} from 'react-router-dom'; 

//import AuthService from '../../../services/auth/autenticacion';

const SideBar = (props) =>{

    const rol = props.idRol;
    const clase = props.clase;

    //datos del usuario en localStorage
    //const userData = AuthService.getCurrentUser();
    return(
        <>
            <div className = {clase ? "active" : ""} id = 'sidebar'>
                <div className = 'sidebar-header'>
                    <img src={logo} id='logoAdmin' className = 'logo'/>
                    <img src={beer} id="beer" className = 'iconAdmin'/>
                </div>

                <ul className = 'navbar-nav ml-auto'>
                    
                    <li className = 'nav-item'>
                        <Link to='/admin' className = 'nav-link'>    
                            <FontAwesomeIcon icon = {faHome} />
                            <span className = 'customSpan'>Inicio</span>                 
                        </Link>
                    </li>
                    {rol &&(
                        <li>
                            <Link to='/admin/clientes' className='nav-link dropdown-toggle'>
                                <FontAwesomeIcon icon = {faUsers} />
                                <span className = 'customSpan'>Clientes</span>
                            </Link>
                        </li>
                    )}
                    {rol && (
                        <li>
                        <a href ='#homeRoboshot' data-toggle = 'collapse' aria-expanded = 'false' className='nav-link dropdown-toggle'>
                            <FontAwesomeIcon icon = {faBeer} />
                            <span className = 'customSpan'>Roboshots</span>
                        </a>
                        <ul className = 'list-unstyled collapse' id = 'homeRoboshot'>
                            <li>
                                <Link  to = '/admin/roboshot'>
                                    Ver Lista
                                </Link>
                            </li>
                            <li>
                                <Link  to = '/admin/roboshot/anadir'>
                                    Añadir Roboshot
                                </Link>
                            </li>
                        </ul>
                    </li>
                    )}
                    
                    
                </ul>
            </div>
        </>
    )
};

export default SideBar;