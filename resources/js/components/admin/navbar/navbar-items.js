import React from 'react';

//  react bootstrap 
import {Nav, NavDropdown,} from 'react-bootstrap';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {openModalSwitch, useHomeDispatch, useAuthDispatch, logoutUser} from '../../../context';

const NavItems = (props) => {

    const homeDispatch = useHomeDispatch();
    const userDispatch = useAuthDispatch();

    const salir = (e) => {
        e.preventDefault();
        openModalSwitch(homeDispatch, 'log_out', '');
        logoutUser(userDispatch, homeDispatch)
    }

    return(
        <>
            <Nav >
                <NavDropdown
                    title= 'notificacion'
                    id="basic-nav-dropdown"
                >
                    <NavDropdown.Item >Notification 1</NavDropdown.Item>
                    <NavDropdown.Item >Notification 2</NavDropdown.Item>
                    <NavDropdown.Item >Notification 3</NavDropdown.Item>
                    <NavDropdown.Item >Notification 4</NavDropdown.Item>
                    <NavDropdown.Item >Another notifications</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link onClick = {(e) => salir(e)}>
                        <FontAwesomeIcon icon = 'sign-out-alt' />
                        <span className = 'customSpan'>
                            Cerrar Sesión
                        </span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        
        </>
    )
};

export default NavItems;