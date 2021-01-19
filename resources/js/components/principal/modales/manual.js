import React, {useState, useEffect} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  URL de la API
import Accion from '../../../services/conexion';

//  libreria toast
import {  toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Loader from '../../alertas/loader';
import CategoriasCard from '../cards/categorias-card';
import IngredientesTable from '../tables/ingredients-table';

// hook
import usePedido from '../../../hooks/principal/manual-recipe-hook';

const Contenido = (props) => {

    const id = props.idCliente;

    const [ingredientes, setIngredientes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ingredient, setIngredient] = useState({
        idIngrediente: 0,
        nombre: '',
        idCategoria: 0,
        categoria: '',
        posicion: 0,
        cantidad: 0,
        precio: 0 
    });
    
    const [precioReceta, setPrecioReceta] = useState(0);
    const [cantidadBebida, setCantidadBebida] = useState(0);
    const [idCategoria, setIDCategoria] = useState();
    const [loading, setLoading] = useState(true);
    const lista = usePedido(ingredient, id);

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
        if(lista.ingredientes == ''){
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
            if(lista.cantidad >= 300){
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
                
                //  los envia al carrito
                props.pedir(receta);

                //  cierra el modal
                props.cerrar();
            }
        }
        
    };

    //  muestra los ingredientes por categoria
    const ingxcategoria = (categoria) => {
        setIDCategoria(categoria)
    };

    //  incrementa y decrementa en 10 la cantidad del ingrediente
    const cantidades = (id, ml) => {
        
        let ing = ingredientes.filter(ing => ing.idIngrediente == id)
        let cat = categorias.filter(cat => cat.idCategoria == ing[0].categoria);
        let precioIng = 0;
        if(ml > 0){
            precioIng = (ing[0].precio * ml)/10;
        }else{
            precioIng = ing[0].precio;
        }
        
        setIngredient({
            idIngrediente:id,
            nombre: ing[0].marca,
            idCategoria: ing[0].categoria,
            categoria: cat[0].nombre,
            posicion: ing[0].posicion,
            cantidad: ml,
            precio: precioIng, 
            precioInd: ing[0].precio
        })
        
    };



    //  quita un ingrediente de la lista
    const quitarIngrediente = (id, precio, cantidad, e) => {
        e.preventDefault();
        setPrecioReceta(precioReceta - precio);
        setCantidadBebida(cantidadBebida - cantidad);
        setPedido(pedido.filter(item => item.idIngrediente !== id))
    };


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
                            <CategoriasCard
                                categorias = {categorias}
                                verIngredientes = {(e) => ingxcategoria(e)} 
                            />
                        </div>
                        <div className = 'col-md-6'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Descripción
                            </label>
                            <IngredientesTable
                                idCategoria = {idCategoria} 
                                ingredientes = {ingredientes}
                                cantidadBebida = {(e, i) => cantidades(e, i)}
                                
                            />
                        </div>
                        <div className = 'col-md-3'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Pedido
                            </label>
                        </div>
                    </div>
                    
                    <div className = 'row'>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Precio Total:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                ${parseFloat(lista.precio).toFixed(2)}
                            </span>
                        </div>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Cantidad:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                {lista.cantidad} mL
                            </span>
                        </div>
                        <div className = 'col-md-4'>
                            <button className = 'btn btn-primary'>
                                Ver ingredientes
                            </button>
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