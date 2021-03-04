import React from 'react';
import { Modal }from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//  context
import {
    useAuthState,
    useHomeState, 
    useHomeDispatch, 
    closeModalSwitch, 
    deleteOrderToCart, 
    emptyCart,
    orderCart
} from '../../../context'

//  componentes
import SinElementos from '../../alertas/vacio';

const ModalCarrito = () => {

    const settings = useHomeState();
    const userData = useAuthState();
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
                                            <a className = 'btn btn-danger' onClick = {(e) => deleteOrderToCart(dispatch, item, settings.total, settings.counter, e)} >
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
                    <button className = 'btn btn-danger' onClick = {(e) => emptyCart(dispatch, e)} >
                        Vaciar Carrito
                    </button>
                    <button className = 'btn btn-success' disabled = {settings.loading} onClick = {(e) => orderCart(dispatch, settings, userData)} >
                        {(settings.loading == true && settings.module == 'order_cart') && (
                            <span className = "spinner-border spinner-border-sm"></span>
                        )}
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