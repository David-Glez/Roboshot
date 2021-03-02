import React, {useState, useEffect} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  URL de la API
import Accion from '../../../services/conexion';

//  componentes
import Loader from '../../alertas/loader';

const Contenido = (props) =>{

    const idReceta = props.idReceta;
    const idCliente = props.idCliente;

    //  estados
    const [receta, setReceta] = useState({
        idReceta: 0,
        idCliente: 0,
        cliente: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        img: '',
        ingredientes: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inicio = async() => {
            const envio = Accion.traeReceta(idReceta, idCliente);
            
            envio.then(resp => {
                setLoading(false)
                setReceta({
                    idReceta: resp.data.idReceta,
                    idCliente: resp.data.idCliente,
                    cliente: resp.data.cliente,
                    nombre: resp.data.nombre,
                    descripcion: resp.data.descripcion,
                    precio: parseInt(resp.data.precio),
                    img: resp.data.img,
                    ingredientes: resp.data.ingredientes
                });
            });
            
        };
        inicio();
    }, []);

    const pedir = (e) =>{
        e.preventDefault();
        props.pedido(receta);
        props.cerrar()
    }

    return (
        <>
        <Modal.Body>
            
            <div className = 'mb-3'>
                {loading ? (
                    <div className = 'row superior'>
                        <Loader />
                    </div>
                ):(
                    <div className = 'row no-gutters'>
                        <div className = 'col-md-4'>
                            <img className = 'card-img imagenReceta' src = {receta.img} />
                        </div>
                        <div className = 'col-md-8'>
                            <div className = 'card-body'>
                                <h5 className = 'card-title see-more-title'>
                                    {receta.nombre}
                                </h5>
                                <div className = 'form-group'>
                                    <span>Contiene:</span>
                                    <ul>
                                        {receta.ingredientes.map((item, index) => {
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
                                        ${parseFloat(receta.precio).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
            
        </Modal.Body>
        <Modal.Footer>
            <button className = 'btn btn-secondary float-left' onClick = {props.cerrar}>
                Cancelar
            </button>
            <button className = 'btn btn-success' disabled = {loading} onClick = {(e) => pedir(e)}>
                Pedir
            </button>
        </Modal.Footer>
        </>
    )
}

const ModalReceta = (props) => {
    const ver = props.activo;
    const idReceta = props.idReceta;
    const idCliente = props.idCliente;

    if(ver){
        return(
            <>
            <Modal
                size = 'lg'
                show = {props.activo}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Receta
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Contenido 
                    idReceta = {idReceta} 
                    idCliente = {idCliente} 
                    cerrar = {props.inactivo}
                    pedido = {props.pedido}
                />
                
            </Modal>
            </>
        )
    }else{
        return null;
    }
}

export default ModalReceta;