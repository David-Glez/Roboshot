import React from 'react';

//  navegacion
import {Link} from 'react-router-dom';

//  logo
import logo from '../../../assets/img/roboshot-logo-1.png'

const HeaderSign = (props) => {

    return(
        <>
        <nav className = 'navbar navbarPrincipal bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <Link to = '/' className = 'navbar-brand'>
                        <img className = 'logoHome' src = {logo}  alt = '' />
                    </Link>
                </div>
            </div>
        </nav>
        </>
    )
}

export default HeaderSign;