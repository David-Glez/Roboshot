import React from 'react';

import {Modal, Spinner} from 'react-bootstrap';
import {useHomeState} from '../../../context';

const LoadingModal = (props) => {
    
    const settings = useHomeState();

    if(settings.modal.open == true && settings.modal.name == 'load_home'){
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
                            Cargando contenido
                        </span>
                    </div>
                </Modal.Body>

            </Modal>
        )
    }else{
        return null;
    }
}

export default LoadingModal;