import React from 'react';

const SpanRoboshot = (props) => {

    const estado = props.estado;
    return(
        <>
        {estado ? (
            <>
            <span className="badge bg-success spanColor">Activo</span>
            </>
        ):(
            <>
            <span className="badge bg-danger spanColor">Inactivo</span>
            </>
        )}
        </>
    )
}

export default SpanRoboshot;