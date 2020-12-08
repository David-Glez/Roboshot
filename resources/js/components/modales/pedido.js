import React, {useState} from 'react';

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

    const [ingredientes, setIngredientes] = useState([]);

    //  muestra la lista de los ingredientes seleccionados
    const listaIngredientes = (e, prod, codigo) => {
        const codProd = codigo+'-'+prod;
        const ingrediente = data.recetas[prod-1].ingredientes;

        setIngredientes(ingrediente)
    };

    //  muestra la informacion de los ingredientes
    const ingredientesInfo = () =>{
        return ingredientes.map((item, index) => {
            return(
                
                <li key = {index} className = 'list-group-item'>
                    <div className = 'row'>
                        <div className = 'form-group'>
                            <label className = 'primaryText'>
                                Marca: {item.marca}
                            </label>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'primaryText'>
                                Precio: ${parseFloat(item.precio).toFixed(2)} / 10 mL
                            </label>
                        </div>
                        <div className = 'form-group'>
                            <label className = 'primaryText'>
                                Cantidad: {item.cantidad} mL
                            </label>
                        </div>  
                    </div>
                </li>
                
            )
        })
    }

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
                                <div className = 'col-sm-4'>
                                    <span id = 'codigo' className = 'primaryText form-control-plaintext'>
                                        {data.codigo}
                                    </span>
                                </div>
                                <label htmlFor = 'codigo' className="col-sm-2 col-form-label">Precio</label>
                                <div className = 'col-sm-4'>
                                    <span id = 'codigo' className = 'text-success form-control-plaintext'>
                                        ${parseFloat(data.total).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className = 'row'>
                                
                            </div>
                            <div className = 'row'>
                                <div className = 'col-sm-6'>
                                    <div className = 'card'>
                                        <div className = 'card-header'>
                                            Recetas
                                        </div>
                                        <div className = 'card-body'>
                                            <ul className = 'list-group scrollDiv'>
                                                {data.recetas.map((item, index) => {
                                                    return(
                                                        <li className = 'list-group-item' key = {index} >
                                                            <a href = '#' onClick = {(e) => listaIngredientes(e, item.idProd, data.codigo)}>
                                                                <div className = 'row'>
                                                                    <div className = 'col-sm-6'>
                                                                        {item.nombre}
                                                                    </div>
                                                                    <div className = 'col-sm-6'>
                                                                        <span className = 'text-success'>
                                                                            ${parseFloat(item.precio).toFixed(2)}
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-sm-6'>
                                    <div className = 'card'>
                                        <div className = 'card-header'>
                                            Ingredientes
                                        </div>
                                        <div className = 'list-group scrollDiv'>
                                            {ingredientesInfo()}
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