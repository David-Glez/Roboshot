import React from 'react';
import { Modal}from 'react-bootstrap';
import QRGenerator from '../qr-code/qr-code';
import {useHomeState, useHomeDispatch, closeModalSwitch} from '../../../context'

const ModalCodigo = (props) => {

    const settings = useHomeState();
    const dispatch = useHomeDispatch();

    if(settings.modal.open == true && settings.modal.name == 'qr_code'){
        return(
            <>
            <Modal
                show = {settings.modal.open}
                onHide = {(e) => closeModalSwitch(dispatch, e)}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered'
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Tu pedido
                    </h5>
                    <button className = 'close' onClick={(e) => closeModalSwitch(dispatch, e)}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <QRGenerator
                                codigo = {settings.qr_code}
                             />
                        </div>
                        <div className = 'col-md-6'>
                            <p>Codigo: {settings.qr_code}</p>
                            <p>Escanea este QR en la estación Roboshot y disfruta tus bebidas!</p>
                            <small>** Verifica disponibilidad</small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className = 'btn btn-success float-center' onClick = {(e) => closeModalSwitch(dispatch, e)}>
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