import React, {useState, useEffect} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  componentes
import QRGenerator from '../qr-code/qr-code';
import RecipeList from '../cards/recipe-list-card';
import IngredientsList from '../cards/ingredients-list-card';
import {useHomeState, useHomeDispatch, closeModalSwitch} from '../../../context';

const ModalPedido = (props) => {

    const settings = useHomeState();
    const dispatch = useHomeDispatch();
    console.log(settings)
    
    if(settings.modal.open == true && settings.modal.name == 'order_item'){
        const item = settings.modal.data;
        return(
            <>
            <Modal
                show = {settings.modal.open}
                onHide = {(e) => closeModalSwitch(dispatch, e)}
                size = 'xl'
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Pedido
                    </h5>
                    <button className = 'close' onClick={(e) => closeModalSwitch(dispatch, e)}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = 'row'>
                        <div className = 'col-md-3'>
                            <div className = 'row '>
                                <div className = 'col-md-12  text-center'>
                                <QRGenerator
                                    codigo = {item.codigo}
                                />
                                </div>
                            </div>
                             <div className = 'row'>
                                <label htmlFor = 'codigo' className="col-sm-4 col-form-label">Código:</label>
                                <div className = 'col-sm-8'>
                                    <span id = 'codigo' className = 'primaryText form-control-plaintext'>
                                        {item.codigo}
                                    </span>
                                </div>
                            </div>
                            <div className = 'row'>
                                <label htmlFor = 'codigo' className="col-sm-4 col-form-label">Precio:</label>
                                <div className = 'col-sm-8'>
                                    <span id = 'codigo' className = 'text-success form-control-plaintext'>
                                        ${parseFloat(item.total).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-md-9'>
                            <div className = 'row'>
                                <div className = 'col-md-5'>
                                    <RecipeList 
                                        recipes = {item.recetas}
                                        code = {item.codigo}
                                    />
                                </div>
                                <div className = 'col-md-7'>
                                    
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

/*
<div className = 'row'>
                        <div className = 'col-md-3 text-center'>
                            <QRGenerator 
                                codigo = {data.codigo}
                            />
                        </div>
                        <div className = 'col-md-9'>
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
                                <div className = 'col-sm-5'>
                                    <RecipeList 
                                        recipes = {data.recetas}
                                        code = {data.codigo}
                                        position = {(e) => ingPosition(e)}
                                    />

                                </div>
                                <div className = 'col-sm-7'>
                                    <IngredientsList
                                        ingredients = {ingredients}
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
 */

export default ModalPedido;