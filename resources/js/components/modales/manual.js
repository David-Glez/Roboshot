import React, {useState, useEffect} from 'react';

//  estilos
import {Modal, Spinner} from 'react-bootstrap';

//  URL de la API
import Accion from '../../services/conexion';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Contenido = () => {
    return(
        <>
        <Modal.Body>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-3'>
                        <ul className = 'list-group list-group-flush'>

                        </ul>
                    </div>
                    <div className = 'col-md-6'>

                    </div>
                    <div className = 'col-md-3'>
                        
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button className = 'btn btn-success'>Añadir al carrito</button>
        </Modal.Footer>
        </>
    );
}

const ModalManual = (props) =>{
    const ver = props.activo;
    const quitar = props.inactivo;
    if(ver){
        return(
            <>
            <Modal
                size = 'xl'
                show = {props.activo}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Arma tu receta
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>

                <Contenido />
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalManual;