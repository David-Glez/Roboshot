import React, {useState, useEffect} from 'react';
import {Link}from 'react-router-dom';
//  Logo roboshot
import logo from '../../../assets/img/roboshot-logo-1.png';
//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast} from 'react-toastify';
//  context
import {useAuthState, useHomeState, useHomeDispatch, openModalSwitch} from '../../../context';
import useUserLogout from '../../../hooks/user-state/user-logout-hook'
const Header = (props) => {

    //  read user details from context
    const userDetail = useAuthState();
    const {log_out} = useUserLogout();

    //  read order details from context
    const settings = useHomeState();
    const dispatch = useHomeDispatch();
    const [route, setRoute] = useState('/perfil')

    useEffect(() => {
        if(userDetail.id_rol == 4){
            setRoute('/perfil')
        }
        if(userDetail.id_rol == 2 || userDetail.id_rol == 1){
            setRoute('/admin')
        }
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
    }, [userDetail])
    
    return(
        <>
        <nav className = 'navbar navbar-expand-lg navbar-light bg-light sticky-top navbarPrincipal'>
            <Link to = '/' className = 'navbar-brand'>
                <img className = 'logoHome' src = {logo}  alt = '' />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-home-rob" aria-controls="nav-home-rob" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className = 'collapse navbar-collapse' id = 'nav-home-rob'>
                <ul className = 'navbar-nav ml-auto'>
                    <li className = 'nav-item '>
                        <button type="button" className="btn btn-outline-warning mr-sm-2" onClick = {(e) => openModalSwitch(dispatch, 'cart', '', e)}>
                            <FontAwesomeIcon icon = 'shopping-cart' /> <span className="badge badge-light" id="NumCarrito">{settings.counter}</span>
                        </button>
                    </li>
                    {userDetail.access ? (
                        <>
                        <li className = 'nav-item dropdown '>
                            <a className="nav-link dropdown-toggle" href="#" id="log_user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon = 'user-alt' className = 'mr-sm-2' />
                                <span className = 'my-2 my-sm-0'>{userDetail.user}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="log_user">
                                <Link to = {route} className = 'dropdown-item'>
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
                        </li>
                        </>
                    ):(
                        <>
                        <li className = 'nav-item'>
                            <Link to = {"/registro"} className = ' nav-link '>Registrate</Link>
                        </li>
                        <li className = 'nav-item'>
                            <Link to = {"/login"} className=" nav-link  ">Iniciar Sesión</Link>
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