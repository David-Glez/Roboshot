import React from 'react';

//  react bootstrap
import {Navbar} from 'react-bootstrap';

//  componentes
import NavItems from './navbar-items';

const AdminNavBar = (props) => {

    return(
        <>
        <Navbar expand="lg" bg="light" variant="light">
            <div className = 'container-fluid'>
                <Navbar.Brand>
                    {props.brandText}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavItems />
                </Navbar.Collapse>
            </div>
        </Navbar>
        </>
    );
};

export default AdminNavBar;