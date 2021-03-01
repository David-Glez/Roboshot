import React from 'react';

//  navegacion
import {Link} from 'react-router-dom';

//  logo
import logo from '../../../assets/img/roboshot-logo-1.png'

const HeaderSign = (props) => {

    return(
        <>
        <nav className = 'navbar navbar-expand-lg navbar-light bg-light sticky-top navbarPrincipal'>
            <Link to = '/' className = 'navbar-brand'>
                <img className = 'logoHome' src = {logo}  alt = '' />
            </Link>
        </nav>
        </>
    )
}

export default HeaderSign;