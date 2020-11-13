import React from 'react';

import Alert from '../../img/exclamation-mark.svg';

const SinElementos = () => {

    return(
        <>
        <div className = 'contenedor'>
            <div className = 'bebida'>
                <div className = 'alerta'>
                    <img src = {Alert}></img>
                </div>
            </div>
            <div id = "text">
                <span>No hay datos a mostrar</span>
            </div>
        </div>
            
        </>
    );
};

export default SinElementos;