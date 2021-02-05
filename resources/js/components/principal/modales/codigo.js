import React from 'react';

//  Estilos
import { Modal}from 'react-bootstrap';

//  componentes
import QRGenerator from '../qr-code/qr-code';

const ModalCodigo = (props) => {
    const ver = props.activo;
    const cerrar = props.inactivo;
    const codigo = props.codigo;

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
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <QRGenerator 
                                codigo = {codigo}
                            />
                        </div>
                        <div className = 'col-md-6'>
                            <p>Escanea este QR en la estación Roboshot y disfruta tus bebidas!</p>
                            <small>** Verifica disponibilidad</small>
                        </div>
                    </div>
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