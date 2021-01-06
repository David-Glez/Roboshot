import React from 'react';

//  react bootstrap 
import {Nav, NavDropdown,} from 'react-bootstrap';

const NavItems = (props) => {

    const salir = (e) => {
        e.preventDefault();
        props.logout();
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
                        Cerrar Sesión
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        
        </>
    )
};

export default NavItems;