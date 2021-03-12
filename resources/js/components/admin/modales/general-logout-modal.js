import React from 'react';

import {Modal, Spinner} from 'react-bootstrap';
import {useHomeDispatch, useHomeState} from '../../../context';

const LogOutModal = (props) => {

    const settings = useHomeState();
    
    if(settings.modal.open == true && settings.modal.name == 'log_out'){
        return(
            <Modal
                show = {settings.modal.open}
                //onHide = {props.inactivo}
                size = 'lg'
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered'
                className = 'modalTransparente'
            >
                <Modal.Body>
                    <div className = 'row superior'>
                        <Spinner animation="border" variant="light"/>
                        <span className = 'text-center text-white customSpanAdmin'>
                            Cerrando Sesión
                        </span>
                    </div>
                </Modal.Body>

            </Modal>
        )
    }else{
        return null;
    }
}

export default LogOutModal;