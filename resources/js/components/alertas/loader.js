import React from 'react';

const Loader = () => {
    
    return(
        <>
            <div className = 'contenedor'>
                <div className = 'bebida'>
                    <div id = 'cristal'>
                        <div id = 'beer'></div>
                    </div>
                    <div id="agarradera"></div>
                    <div id="espuma_1"></div>
                    <div id="espuma_2"></div>
                    <div id="espuma_3"></div>
                    <div id="espuma_4"></div>
                    <div id="espuma_5"></div>
                    <div id="espuma_superior"></div>
                    <div id="espuma_interior"></div>
                    <div id="espuma_interior_2"></div>
                    <div id="espuma_interior_3"></div>
                    <div id="espuma_interior_4"></div>
                    
                </div>
                <div id="text">
                    <span>Cargando...</span>
                </div>
            </div>
            
        </>
    );
};

export default Loader;