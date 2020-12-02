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
import QRGenerator from '../assets/qr-generator';


const ModalPedido = (props) => {
    const ver = props.activo;
    const cerrar = props.inactivo;
    const data = props.pedido;

    if(ver){
        return(
            <>
            <Modal
                show = {ver}
                onHide = {props.inactivo}
                size = 'xl'
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Pedido
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'row'>
                        <div className = 'col-md-4 text-center'>
                            <QRGenerator 
                                codigo = {data.codigo}
                            />
                        </div>
                        <div className = 'col-md-8'>
                            <div className = 'row'>
                                <label htmlFor = 'codigo' className="col-sm-2 col-form-label">Código</label>
                                <div className = 'col-sm-10'>
                                    <span id = 'codigo' className = 'primaryText form-control-plaintext'>
                                        {data.codigo}
                                    </span>
                                </div>
                            </div>
                            <div className = 'row'>
                                <label htmlFor = 'codigo' className="col-sm-2 col-form-label">Precio</label>
                                <div className = 'col-sm-10'>
                                    <span id = 'codigo' className = 'text-success form-control-plaintext'>
                                        ${parseFloat(data.total).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className = 'row'>
                                <div className = 'col-sm-6'>
                                    <div className = 'card'>
                                        <div className = 'card-header'>
                                            Recetas
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-sm-6'>
                                    <div className = 'card'>
                                        <div className = 'card-header'>
                                            Ingredientes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalPedido;