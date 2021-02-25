import React from 'react';

//  components
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardRoboshot from '../../components/principal/cards/roboshot-card';

//  context and custom hooks
import {useHomeState, useAuthState} from '../../context';
import useRoboshotList from '../../hooks/principal/roboshots/roboshots-hook';

const RoboshotCard = (props) => {

    const userDetails = useAuthState();
    const settings = useHomeState();
    const {list} = useRoboshotList(userDetails.access);
    return(
        <>
        {settings.loading ?(
            <div className = 'row superior'>
                <Loader />
            </div>
        ):(
            <div className = 'row'>
                {(list == '') ? (
                    <div className = 'col-md-12 superior'>
                        <SinElementos />
                    </div>
                ):(
                    <>
                    {list.map((x) => 
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