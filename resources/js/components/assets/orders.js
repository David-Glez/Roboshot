import React, {useState, useEffect} from 'react';

//  libreria de navegacion
import {Redirect} from 'react-router-dom';

const Ordenes = (props) => {

    const logueado = props.logueado;
    const usuario = props.usuario;

    if(logueado == true){
        return(
            <>
            <div>
                Aqui van los datos de los pedidos de un cliente
            </div>
            </>
        )
    }else{
        return <Redirect to = '/' />
    }
    

};

export default Ordenes;