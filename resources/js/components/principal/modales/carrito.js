import React from 'react';
import { Modal }from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//  context
import {useHomeState, useHomeDispatch, closeModalSwitch, deleteOrderToCart, emptyCart} from '../../../context'

//  componentes
import SinElementos from '../../alertas/vacio';

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
                {(lista == '') ? (
                    <div className = 'row superior'>
                        <SinElementos />
                    </div>
                ):(
                    <>
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
                                                <FontAwesomeIcon icon = 'trash-alt' />
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
                </>
                )}
                
            </div>
        </Modal.Body>
        <Modal.Footer>
            
        </Modal.Footer>
        </>
    )

};

const ModalCarrito = () => {

    const settings = useHomeState();
    const dispatch = useHomeDispatch();

    if(settings.modal.open == true && settings.modal.name == 'cart'){
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
                        Carrito de compras
                    </h5>
                    <button className = 'close' onClick={(e) => closeModalSwitch(dispatch, e)}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'container'>
                        {(settings.cart == '') ? (
                        <div className = 'row superior'>
                            <SinElementos />
                        </div>
                        ) : (
                        <>
                        <div className = 'row'>
                            <div className = 'col-md-12'>
                                <ul className = 'list-group scrollDiv'>
                                    {settings.cart.map((item, index) => {
                                        return(
                                        <li className = 'list-group-item d-flex justify-content-between align-items-center' key = {index}>
                                            <div className = 'image-parent'>
                                                <img className = 'img-fluid' src = {item.img} />
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
                                            <a className = 'btn btn-danger' onClick = {(e) => deleteOrderToCart(dispatch, item, e)} >
                                                <FontAwesomeIcon icon = 'trash-alt' />
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
                            <span className = 'text-success'>${parseFloat(settings.total).toFixed(2)}</span>
                        </div>
                        </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className = 'btn btn-secondary' onClick = {(e) => closeModalSwitch(dispatch, e)}>
                        Cerrar
                    </button>
                    <button className = 'btn btn-danger' >
                        Vaciar Carrito
                    </button>
                    <button className = 'btn btn-success' >
                        Pedir
                    </button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalCarrito;