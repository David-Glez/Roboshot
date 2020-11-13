import React from 'react';

//  Estilos
import { Modal}from 'react-bootstrap';


const ModalCodigo = (props) => {
    const ver = props.activo;
    const cerrar = props.inactivo;

    if(ver){
        return(
            <>
            <Modal
                show = {props.activo}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered'
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Tu pedido
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'form-group'>
                        <label className = 'primaryText'>
                            Código:
                        </label>
                        <h3>{props.codigo}</h3>
                    </div>
                    <p>
                        Este código es canjeable en cualquier estación Roboshot, sientete libre de usarlo
                        (Verifica la disponibilidad de tu bebida en la estación)
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className = 'btn btn-success float-center' onClick = {props.inactivo}>
                        Aceptar
                    </button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }else{
        return null;
    }
    
};

export default ModalCodigo;