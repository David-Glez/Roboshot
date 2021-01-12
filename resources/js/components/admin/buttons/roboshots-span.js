import React from 'react';

const SpanRoboshot = (props) => {

    const estado = props.estado;
    return(
        <>
        {estado ? (
            <>
            Activo
            </>
        ):(
            <>
            Inactivo
            </>
        )}
        </>
    )
}

export default SpanRoboshot;