import React from 'react';

import {Link}from 'react-router-dom';

//  Logo roboshot
import logo from '../../../assets/img/roboshot-logo-1.png';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <nav className = 'navbar navbar-expand-lg navbar-light bg-light navbarPrincipal'>
            <Link to = '/' className = 'navbar-brand'>
                <img className = 'logoHome' src = {logo}  alt = '' />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-home-rob" aria-controls="nav-home-rob" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className = 'collapse navbar-collapse' id = 'nav-home-rob'>
                <ul className = 'navbar-nav ml-auto'>
                    <li className = 'nav-item '>
                        <button type="button" className="btn btn-outline-warning mr-sm-2" onClick = {(e) => carrito(e)}>
                            <FontAwesomeIcon icon = 'shopping-cart' /> <span className="badge badge-light" id="NumCarrito">{props.counter}</span>
                        </button>
                    </li>
                    {login ? (
                        <>
                        <li className = 'nav-item dropdown '>
                            <a className="nav-link dropdown-toggle" href="#" id="log_user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon = 'user-alt' className = 'mr-sm-2' />
                                {data.usuario}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="log_user">
                                <Link to = '/perfil' className = 'dropdown-item'>
                                    <div className = 'flexContainer'>
                                        <div>
                                            <FontAwesomeIcon icon = 'user-alt' />
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
                                            <FontAwesomeIcon icon = 'sign-out-alt' />
                                        </div>
                                        <div className = 'customSpan'>
                                            Cerrar Sesión
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </li>
                        </>
                    ):(
                        <>
                        <li className = 'nav-item'>
                            <Link to = {"/registro"} className = 'btn btn-outline-primary btn-radius mr-sm-2'>Registrate</Link>
                        </li>
                        <li className = 'nav-item'>
                            <Link to = {"/login"} className="btn btn-primary btn-radius float-right mr-sm-2">Iniciar Sesión</Link>
                        </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
        </>
    )

};

export default Header;