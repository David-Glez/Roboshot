import React, {useEffect} from 'react';
import {Link}from 'react-router-dom';
//  Logo roboshot
import logo from '../../../assets/img/roboshot-logo-1.png';
//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast} from 'react-toastify';
//  context
import {useAuthState} from '../../../context';
import useUserLogout from '../../../hooks/user-state/user-logout-hook'
const Header = (props) => {

    //  read user details from context
    const userDetail = useAuthState();
    const {log_out} = useUserLogout();

    useEffect(() => {
        if(userDetail.message != null && userDetail.access == false){
            toast.warning(userDetail.message,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            });
        }
    }, [userDetail.access, userDetail.message])
    
    const carrito = (e) => {
        e.preventDefault();
        props.carrito(e);
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
                        <FontAwesomeIcon icon = 'shopping-cart' /> <span className="badge badge-light" id="NumCarrito">{props.counter}</span>
                    </button>
                    {userDetail.access ? (
                        <div className="dropleft float-right">
                            <button className="btn btn-outline-secondary " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className = 'flexContainer'>
                                    <div className = 'dropdown-toggle'>
                                        <FontAwesomeIcon icon = 'user-alt' />
                                    </div>
                                    <div className = 'customSpan'>
                                        {userDetail.user}
                                    </div>
                                </div>
                            </button>
                            <div className="dropdown-menu">
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
                                <button className="dropdown-item" onClick = {(e) => log_out(e)}>
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