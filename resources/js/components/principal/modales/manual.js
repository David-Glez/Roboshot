import React from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  libreria toast
import {  toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Loader from '../../alertas/loader';
import CategoriasCard from '../cards/categorias-card';
import IngredientesTable from '../tables/ingredients-table';
import AnimatedGlass from '../cards/animated-glass-section';

// hook
import useManualRecipe from '../../../hooks/principal/recipes/manual-recipe-hook';
import {useHomeState, closeModalSwitch, useHomeDispatch} from '../../../context';

const Contenido = (props) => {
    
    const settings = useHomeState();
    const dispatch = useHomeDispatch()
    const {
        categories,
        pedido, 
        ingCat,
        ingredientsxcategory, 
        ingredientSelected,
        sendToCart  
    } = useManualRecipe();
    
    
    //  envia la receta al carrito
    const enviar = (e) => {
        e.preventDefault();

        console.log('enviar a carrito')
        //  en el caso de que no haya elementos no envia nada
        /*if(lista.ingredientes == ''){
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
                props.pedir(lista);

                //  cierra el modal
                props.cerrar();
            }
        }*/
        
    };

    return(
        <>
        <Modal.Body>
            {(settings.loading && settings.module == 'ingredients') ? (
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
                                categorias = {categories}
                                verIngredientes = {(e) => ingredientsxcategory(e)} 
                            />
                        </div>
                        <div className = 'col-md-6'>
                            <label htmlFor = 'ingredients' className = 'col-form-label primaryText'>
                                Descripción
                            </label>
                            <IngredientesTable
                                
                                ingredientes = {ingCat}
                                cantidadBebida = {(e, i) => ingredientSelected(e, i)}
                                lista = {pedido}
                                
                            />
                        </div>
                        <div className = 'col-md-3'>
                            <AnimatedGlass
                                cantidad = {pedido.cantidad} 
                            />
                            
                        </div>
                    </div>
                    
                    <div className = 'row'>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Precio Total:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                ${parseFloat(pedido.precio).toFixed(2)}
                            </span>
                        </div>
                        <div className = 'col-md-4'>
                            <label className = 'col-sm-6 col-form-label primaryText'>
                                Cantidad:
                            </label>
                            <span className = 'col-sm-6 col-form-label text-success'>
                                {pedido.cantidad} mL
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
            <button className = 'btn btn-success' onClick = {(e) => sendToCart(e)}>Añadir al carrito</button>
            <button className = 'btn btn-danger' onClick = {(e) => closeModalSwitch(dispatch, e)} >Cerrar</button>
        </Modal.Footer>
        </>
    );
}

const ModalManual = () =>{
    const settings = useHomeState();
    const dispatch = useHomeDispatch();
    
    if(settings.modal.open == true && settings.modal.name == 'custom'){
        return(
            <>
            <Modal
                size = 'xl'
                show = {settings.modal.open}
                onHide = {(e) => closeModalSwitch(dispatch, e)}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Arma tu receta
                    </h5>
                    <button className = 'close' onClick={(e) => closeModalSwitch(dispatch, e)}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>

                <Contenido/>
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalManual;