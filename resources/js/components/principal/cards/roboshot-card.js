import React from 'react';

import {Link} from 'react-router-dom';

const CardRoboshot = (props) => {
    const roboshots = props.datos;

    return(
        <>
        <div className = 'col-sm-3 my-sm-2'>
            <div className = 'card mb-4 mb-sm-1'>
                <img className = 'card-img-top img-fluid' src = {roboshots.logo} style = {{maxHeight: 255}} alt = 'Card image cap' />
                <div className = 'card-body'>
                    <h5 className = 'card-title'>{roboshots.razonSocial}</h5>
                    <div className = 'text-center'>
                        <Link 
                            to = {{
                                pathname: '/roboshot',
                                idCliente: roboshots.idCliente
                            }}
                            className = 'btn pedir'>
                            Ver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardRoboshot;