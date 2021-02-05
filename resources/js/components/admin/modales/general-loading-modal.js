import React from 'react';

import {Modal, Spinner} from 'react-bootstrap';

const LoadingModal = (props) => {
    const ver = props.ver;
    if(ver){
        return(
            <Modal
                show = {ver}
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