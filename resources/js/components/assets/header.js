import React from 'react';

import {Link}from 'react-router-dom';

//  Logo roboshot
import logo from '../../img/roboshot-logo-1.png';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
        <nav className = 'navbar nabvar-expanded-md navbar-dark bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <a className = 'navbar-brand'>
                        <img className = 'logo' src = {logo}  alt = '' />
                    </a>
                </div>
                
                <div className = 'col-md-4'>
                    <button type="button" className="btn btn-outline-warning" onClick = {(e) => carrito(e)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <span className="badge badge-light" id="NumCarrito">{props.counter}</span>
                    </button>
                    {login ? (
                        <button className = 'btn btn-outline-secondary btn-radius float-right' onClick = {(e) => cerrarSesion(e)}>
                            <div className = ' flexContainer'>
                                <div>
                                    <FontAwesomeIcon icon = {faSignOutAlt} />
                                </div>
                                <div className = 'customSpan'>
                                    Cerrar Sesión
                                </div> 
                            </div> 
                        </button>
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