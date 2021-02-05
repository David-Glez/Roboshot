import React from 'react';

import {Link} from 'react-router-dom';

const CardRoboshot = (props) => {
    const roboshots = props.datos;

    return(
        <>
        <div className = 'col-sm-3 my-sm-2'>
            <div className = 'card mb-4 mb-sm-1'>
                <div className = 'recipeImage'>
                    <div className = 'contentImage'>
                    <img className = 'card-img-top img-fluid' src = {roboshots.logo} alt = 'Card image cap' />
                    </div>
                </div>
                
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