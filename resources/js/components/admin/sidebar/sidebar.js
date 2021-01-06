import React from 'react';
//  navegacion
import {Link} from 'react-router-dom';

//  logo
import logo from '../../../assets/img/roboshot-logo-1.png'

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//  components
import ItemSidebar from './sidebar-list-item';

const Sidebar = (props) => {
    
    const rutas = props.rutas;
    const loading = props.loading;
    
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
                            <FontAwesomeIcon icon = 'home' />
                            <span className = 'customSpanAdmin'>
                                Inicio
                            </span>
                        </Link>
                    </li>
                {loading ? (
                    <div></div>
                ):(
                    <>
                    {rutas.map((x) =>
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