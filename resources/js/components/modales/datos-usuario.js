import React from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  URL de la API
import Accion from '../../services/conexion';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Loader from '../alertas/loader';
import SinElementos from '../alertas/vacio';

const ModalUsuario = (props) => {
    const ver = props.activo;
    const quitar = props.inactivo;
    
    if(ver){
        return(
            <>
            <Modal
                show = {ver}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Datos de Usuario
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
            </Modal>
            </>
        )
    }else{
        return null;
    }
}

export default ModalUsuario;