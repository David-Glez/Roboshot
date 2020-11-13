import React, {useState, useRef} from 'react';

//  URL's API
//import Accion from '../services/conexion';

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import { Modal, Spinner }from 'react-bootstrap';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Contenido = (props) => {

    const lista = props.lista;
    const precio = props.total

    //  elimina todo el contenido del carrito
    const vaciarLista = (e) => {
        e.preventDefault();
        props.vaciar();
        props.cerrar();
    };

    //  elimina un elemento del carrito
    const eliminaReceta = (id) => {
        props.elimina(id);
    };

    return(
        <>
        <Modal.Body>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <ul className = 'list-group scrollDiv'>
                            
                            {lista.map((item, index) => {
                                return(
                                    <li className = 'list-group-item d-flex justify-content-between align-items-center' key = {index}>
                                        <div className = 'image-parent'>
                                            <img className = 'img-fluid' src = {window.location.origin+''+item.img} />
                                        </div>
                                        <div>
                                            {item.nombre}
                                        </div>
                                        <div>
                                            <label className = 'primaryText'>
                                                Precio:
                                            </label>
                                            <span className = 'text-success'>${parseFloat(item.precio).toFixed(2)}</span>
                                        </div>
                                        <a className = 'btn btn-danger' onClick = {() => eliminaReceta(item.prod) } >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className = 'form-group'>
                    <label className = 'primaryText'>
                        Total:
                    </label>
                    <span className = 'text-success'>${parseFloat(precio).toFixed(2)}</span>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button className = 'btn btn-secondary' onClick = {props.cerrar}>
                Cerrar
            </button>
            <button className = 'btn btn-danger' onClick = {(e) => vaciarLista(e)}>
                Vaciar Carrito
            </button>
            <button className = 'btn btn-success' onClick = {props.pedir}>
                Pedir
            </button>
        </Modal.Footer>
        </>
    )

};

const ModalCarrito = (props) => {

    const ver = props.activo;

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
                        Carrito de compras
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Contenido
                    cerrar = {props.inactivo}
                    total = {props.total}
                    lista = {props.lista}
                    elimina = {props.elimina}
                    vaciar = {props.vaciar}
                    pedir = {props.pedir}
                />
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalCarrito;