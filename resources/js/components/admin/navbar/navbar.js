import React from 'react';

//  react bootstrap
import {Navbar} from 'react-bootstrap';

//  componentes
import NavItems from './navbar-items';

const AdminNavBar = (props) => {

    const texto = props.brandText;
    const logout = props.logout;
    return(
        <>
        <Navbar expand="lg" bg="light" variant="light">
            <div className = 'container-fluid'>
                <Navbar.Brand>
                    {texto}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavItems
                        logout = {logout} 
                    />
                </Navbar.Collapse>
            </div>
        </Navbar>
        </>
    );
};

export default AdminNavBar;