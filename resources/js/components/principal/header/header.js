import React from 'react';

import {Link}from 'react-router-dom';

//  Logo roboshot
import logo from '../../../assets/img/roboshot-logo-1.png';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUserAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {

    const login = props.logueado;
    const data = props.usuario;

    const carrito = (e) => {
        e.preventDefault();
        props.carrito(e);
    };

    const cerrarSesion = (e) => {
        e.preventDefault();
        props.sesion();
    };

    return(
        <>
        <nav className = 'navbar navbarPrincipal bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <Link to = '/' className = 'navbar-brand'>
                        <img className = 'logoHome' src = {logo}  alt = '' />
                    </Link>
                </div>
                
                <div className = 'col-md-4'>
                    <button type="button" className="btn btn-outline-warning" onClick = {(e) => carrito(e)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <span className="badge badge-light" id="NumCarrito">{props.counter}</span>
                    </button>
                    {login ? (
                        <div className="dropleft float-right">
                            <button className="btn btn-outline-secondary " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className = 'flexContainer'>
                                    <div className = 'dropdown-toggle'>
                                        <FontAwesomeIcon icon = {faUserAlt} />
                                    </div>
                                    <div className = 'customSpan'>
                                        {data.usuario}
                                    </div>
                                </div>
                            </button>
                            <div className="dropdown-menu">
                                <Link to = '/perfil' className = 'dropdown-item'>
                                    <div className = 'flexContainer'>
                                        <div>
                                            <FontAwesomeIcon icon = {faUserAlt} />
                                        </div>
                                        <div className = 'customSpan'>
                                            Perfil
                                        </div>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick = {(e) => cerrarSesion(e)}>
                                    <div className = 'flexContainer'>
                                        <div>
                                            <FontAwesomeIcon icon = {faSignOutAlt} />
                                        </div>
                                        <div className = 'customSpan'>
                                            Cerrar Sesión
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ):(
                        <>
                            <Link to = {"/registro"} className = 'btn btn-outline-primary btn-radius'>Registrate</Link>
                            <Link to = {"/login"} className="btn btn-primary btn-radius float-right">Iniciar Sesión</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
        </>
    )
};

export default Header;