import React from 'react';

//  react bootstrap
import {Grid} from 'react-bootstrap';

const AdminFooter = (props) => {

    return(
        <>
        <footer className="  footerAdmin">
            <div className = 'container-fluid'>
                <p className="copyright pull-right">
                    &copy; {new Date().getFullYear()}{" "}
                    <a href="">
                        Integra Automation
                    </a>
                    <br></br>
                </p>
            </div>
        </footer>
        </>
    )
}

export default AdminFooter;