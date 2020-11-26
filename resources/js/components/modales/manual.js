import React, {useState, useEffect} from 'react';

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

const Contenido = (props) => {

    const id = props.idCliente;

    const [ingredientes, setIngredientes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [pedido, setPedido] = useState([]);
    const [precioReceta, setPrecioReceta] = useState(0);
    const [cantidadBebida, setCantidadBebida] = useState(0);
    const [idCategoria, setIDCategoria] = useState();
    const [idIngrediente, setIDIngrediente] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const inicio = async() =>{
            const result = await Accion.traeIngredientes(id);
            setCategorias(result.data.categorias);
            setIngredientes(result.data.ingredientes);
            
            if(result.data){
                setLoading(false);
            }
        }
        inicio();
    }, []);

    //  envia la receta al carrito
    const enviar = (e) => {
        e.preventDefault();

        //  en el caso de que no haya elementos no envia nada
        if(pedido == ''){
            toast.warning('Debes seleccionar al menos un ingrediente.',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            });
        }else{
            if(cantidadBebida > 300){
                toast.warning('El tamaño máximo de una bebida es de 300 mL.',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined
                }); 
            }else{
                //  genera la estructura de la receta
                let receta = {
                    idReceta: 0,
                    idCliente: id,
                    nombre: 'Personal',
                    cliente: '',
                    descripcion: 'Receta Personalizada',
                    precio: parseInt(precioReceta),
                    img: '/images/camera.jpg',
                    ingredientes: pedido
                };

                //  los envia al carrito
                props.pedir(receta);

                //  cierra el modal
                props.cerrar();
            }
        }
        
    };

    //  muestra los ingredientes por categoria
    const ingxcategoria = (categoria, e) => {
        e.preventDefault();
        setIDCategoria(categoria)
    };

    //  muestra la informacion del ingrediente
    const infxingrediente = (ingrediente, precioIng, e) => {
        e.preventDefault();
        setIDIngrediente(ingrediente);
        setPrecio(precioIng)
        setCantidad(0)
    }

    //  calculo de precio por ingrediente
    const calcularPrecio = () => {
        let precioU = precio;
        let cantidadU = cantidad;
        const precioBebida = (precioU * cantidadU)/10;
        return(
            <span className = 'text-success'>
                ${parseFloat(precioBebida).toFixed(2)}
            </span>
        )
    };

    //  incrementa en 10 la cantidad del ingrediente
    const incremento = (e) => {
        e.preventDefault();

        if(cantidad < 300){
            setCantidad(cantidad + 10);
        }else{
            toast.warning('El tamaño máximo de la bebida es de 300 mL',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            });
        }
    };

    //  decrementa en 10 la cantidad del ingrediente
    const decremento = (e) => {
        e.preventDefault();
        if(cantidad > 10){
            setCantidad(cantidad - 10);
        }else{
            toast.warning('El tamaño mínimo de la bebida es de 10 mL',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            });
        }
    };

    //  añadir ingrediente a receta
    const anadirIngrediente = (categoria, e) => {
        e.preventDefault();
        var i = 0;

        //  busca coincidencias dentro de la lista de ingredientes
        Array.from(pedido).forEach(item => {
            if(item.idIngrediente == idIngrediente){
                i++;
            }
        });

        if(i == 0){
            let cantidadU = cantidad;
            let precioU = precio;
            const precioBebida = (precioU * cantidadU)/10;

            let ing = ingredientes.filter(ing => ing.idIngrediente == idIngrediente);
            let cat = categorias.filter(cat => cat.idCategoria == categoria);

            let pedidos = {
                idIngrediente:idIngrediente,
                nombre: ing[0].marca,
                idCategoria: categoria,
                categoria: cat[0].nombre,
                cantidad: cantidad,
                precio: precioBebida
            };

            setCantidadBebida(cantidadBebida + cantidadU);
            setPrecioReceta(precioReceta + precioBebida);
            setPedido(pedido => [...pedido, pedidos]);

            console.log(pedido)

        }else{
            toast.warning('Éste ingrediente ya está añadido',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            });
        }
    };

    //  quita un ingrediente de la lista
    const quitarIngrediente = (id, precio, cantidad, e) => {
        e.preventDefault();
        setPrecioReceta(precioReceta - precio);
        setCantidadBebida(cantidadBebida - cantidad);
        setPedido(pedido.filter(item => item.idIngrediente !== id))
    };

    //  muestra la lista del pedido
    const lista = () => {
        return(
            <>
            <div className = 'card'>
                <ul className = 'list-group list-group-flush scrollPedido'>
                    {pedido.map((item, index) => {
                        return(
                            <li className = 'list-group-item' key = {index}>
                                <div>
                                    <div>
                                        {item.nombre}
                                    </div>
                                    <span className = 'text-success'>
                                        ${parseFloat(item.precio).toFixed(2)}
                                    </span>
                                    <button className = 'close float-right' onClick = {(e) => quitarIngrediente(item.idIngrediente, item.precio, item.cantidad, e)}>
                                        <span aria-hidden = 'true'>
                                            &times;
                                        </span>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            </>
        )
    };

    //   muestra los ingredientes por categoria y su descripcion
    const descripcion = () => {
        const id = idCategoria;

        const filtro = ingredientes.filter(ing => ing.categoria == id);

        if(filtro == ''){
            return(
                <div className = 'row superior'>
                    <SinElementos />
                </div>
            )
        }else{
           return(
                <div>
                    <div className = 'row descripcionIng'>
                        <div className = 'col-md-6'>
                            <ul className = 'list-group scrollIngr'>
                                {filtro.map((item, index) => {
                                    return(
                                        <div key = {index} onClick = {(e) => infxingrediente(item.idIngrediente, item.precio, e)} className = 'list-group-item'>
                                            {item.marca}
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className = 'col-md-6'>
                            {infoIngrediente()}
                        </div>
                    </div>
                    
                </div>
                 
           ) 
        }
    };

    //  informacion del ingrediente
    const infoIngrediente = () => {
        const id = idIngrediente;

        const filtro = ingredientes.filter(ing => ing.idIngrediente == id);

        if(filtro == ''){
            return(
                <div>

                </div>
            )
        }else{
            return filtro.map(item => {
                return(
                    <div key = {item.idIngrediente}>
                        <div className = 'form-group'>
                            <div>
                                <label className = 'primaryText' htmlFor = 'drink-name'>
                                    Marca:
                                </label>
                                {item.marca}
                            </div>
                            <div>
                                <label className = 'primaryText' htmlFor = 'drink-name'>
                                    Precio:
                                </label>
                                <span>${parseFloat(item.precio).toFixed(2)} / 10 mL</span>
                            </div>
                            <div>
                                <label className = 'primaryText'>
                                    Cantidad:
                                </label>
                            </div>
                            <div className = 'field pb-2'>
                                <span className = 'input-number-decrement' onClick = {(e) => decremento(e)} >-</span>
                                    <input 
                                    className = 'ing-list' 
                                    type = 'text'
                                    name = {'ingrediente'+item.idIngrediente} 
                                    value = {cantidad}
                                    disabled 
                                    ></input>
                                <span className = 'input-number-increment' onClick = {(e) => incremento(e)} >+</span>
                            </div>
                            <div>
                                <label className = 'primaryText'>
                                    Precio Total:
                                </label>
                                {calcularPrecio()}
                            </div>
                            <div>
                                <button className = 'btn btn-outline-success float-right' onClick = {(e) => anadirIngrediente(item.categoria, e)}>
                                    Añadir
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }


    return(
        <>
        <Modal.Body>
            {loading ? (
                <div className = 'container'>
                    <div className = 'col-md-12 superior'>
                        <Loader />
                    </div>
                </div>
            ):(
                <div className = 'container-fluid'>
                    <div className = 'row text-center'>
                        <div className = 'col-md-3'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Categorias
                            </label>
                        </div>
                        <div className = 'col-md-6'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Descripción
                            </label>
                        </div>
                        <div className = 'col-md-3'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Pedido
                            </label>
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'col-md-3'>
                            <ul className = 'list-group list-group-flush scrollDiv'>
                                {categorias.map((item, index) => {
                                    return(
                                        <div
                                            key = {index}
                                            className = 'list-group-item list-group-item-action'
                                            onClick = {(e) => ingxcategoria(item.idCategoria, e)}
                                        >
                                            {item.nombre}
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className = 'col-md-6'>
                            {descripcion()}
                        </div>
                        <div className = 'col-md-3'>
                            {lista()}
                        </div>
                    </div>
                    <div className = 'row'>
                        
                        <div className = 'col-md-4'></div>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Precio Total:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                ${parseFloat(precioReceta).toFixed(2)}
                            </span>
                        </div>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Cantidad:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                {cantidadBebida} mL
                            </span>
                        </div>
                        
                    </div>
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <button className = 'btn btn-success' onClick = {(e) => enviar(e)}>Añadir al carrito</button>
        </Modal.Footer>
        </>
    );
}

const ModalManual = (props) =>{
    const ver = props.activo;
    const quitar = props.inactivo;
    const idCliente = props.idCliente;

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

                <Contenido
                    idCliente = {idCliente} 
                    cerrar = {props.inactivo}
                    pedir = {props.pedido}
                />
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalManual;