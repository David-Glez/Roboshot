import React from 'react';

import Loader from '../components/alertas/loader';
import SinElementos from '../components/alertas/vacio';

const Prueba = () => {

    return(
        <>
            <div className = 'row superior'>
                <SinElementos />
            </div>
            <br></br>
            <br></br>
            <div className = 'row superior'>
                <Loader />
            </div>
        </>
    )

};

export default Prueba;