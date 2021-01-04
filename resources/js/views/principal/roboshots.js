import React from 'react';

//  components
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardRoboshot from '../../components/principal/cards/roboshot-card';

const RoboshotCard = (props) => {

    const lista = props.roboshot;

    return(
        <>
        {props.load ?(
            <div className = 'row superior'>
                <Loader />
            </div>
        ):(
            <div className = 'row'>
                {(lista == '') ? (
                    <div className = 'col-md-12 superior'>
                        <SinElementos />
                    </div>
                ):(
                    <>
                    {lista.map((x) => 
                        <CardRoboshot
                            key = {x.idCliente}
                            datos = {x} 
                        />
                    )}
                    </>
                    
                )}
            </div>
        )}
        
        </>
    )
};

export default RoboshotCard;