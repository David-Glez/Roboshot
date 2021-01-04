import React from 'react';

import {Link} from 'react-router-dom';

//  components
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';

const RoboshotCard = (props) => {

    const lista = props.roboshot;

    const card = () => {
        return lista.map(x =>{
            if(lista == ''){
                return(
                    <div className = 'col-md-12 superior'>
                        <SinElementos />
                    </div>
                );
            }else{
                return(
                    <div className = 'col-sm-3 my-sm-2' key = {x.idCliente}>
                        <div className = 'card mb-4 mb-sm-1'>
                            <img className = 'card-img-top img-fluid' src = {x.logo} style = {{maxHeight: 255}} alt = 'Card image cap' />
                            <div className = 'card-body'>
                                <h5 className = 'card-title'>{x.razonSocial}</h5>
                                <div className = 'text-center'>
                                    <Link 
                                        to = {{
                                            pathname: '/roboshot',
                                            idCliente: x.idCliente
                                        }}
                                        className = 'btn pedir'>
                                        Ver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        });
    };

    return(
        <>
        {props.load ?(
            <div className = 'row superior'>
                <Loader />
            </div>
        ):(
            <div className = 'row'>
                {card()}
            </div>
        )}
        
        </>
    )
};

export default RoboshotCard;