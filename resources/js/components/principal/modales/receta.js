import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {  toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHomeDispatch, useHomeState, closeModalSwitch, addOrderToCart} from '../../../context'

const ModalReceta = () => {

    const dispatch = useHomeDispatch();
    const settings = useHomeState();

    /*const closeSuccessToast = () => {
        dispatch({type: 'CLEAR_SUCCESS'})
    }
    
    useEffect(() => {
        if(settings.success == true && settings.successCode == 101){
            closeModalSwitch(dispatch)
            toast(settings.message,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined,
                onClose: () => closeSuccessToast()
            });
        }
    }, [settings.success, settings.successCode])*/

    if(settings.modal.open == true && settings.modal.name == 'recipe'){

        const data = settings.modal.data;
        return(
            <>
            <Modal
                size = 'lg'
                show = {settings.modal.open}
                onHide = {(e) => closeModalSwitch(dispatch, e)}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Receta
                    </h5>
                    <button className = 'close' onClick={(e) => closeModalSwitch(dispatch, e)}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'row'>
                        <div className = 'col-md-4'>
                            <img className = 'card-img imagenReceta' src = {data.img} />
                        </div>
                        <div className = 'col-md-8'>
                            <div className = 'card-body'>
                                <h5 className = 'card-title see-more-title'>
                                    {data.nombre}
                                </h5>
                                <div className = 'form-group'>
                                    <span>{data.descripcion}</span>
                                </div>
                                <div className = 'form-group'>
                                    <span>Contiene:</span>
                                    <ul>
                                        {data.ingredientes.map((item, index) => {
                                            return(
                                                <li key = {index}>
                                                    {item.nombre}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className = 'form-group'>
                                    <label className = 'primaryText'>
                                        Precio:
                                    </label>
                                    <span className = 'text-success'>
                                        ${parseFloat(data.precio).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className = 'btn btn-secondary float-left' onClick = {(e) => closeModalSwitch(dispatch, e)}>
                        Cancelar
                    </button>
                    <button className = 'btn btn-success' onClick = {(e) => addOrderToCart(dispatch, data, settings.counter, settings.total, e)}>
                        Pedir
                    </button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }else{
        return null;
    }
}

export default ModalReceta;