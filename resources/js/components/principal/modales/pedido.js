import React, {useState, useEffect} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  componentes
import QRGenerator from '../qr-code/qr-code';
import RecipeList from '../cards/recipe-list-card';
import IngredientsList from '../cards/ingredients-list-card';

const ModalPedido = (props) => {
    const ver = props.activo;
    const cerrar = props.inactivo;
    const data = props.pedido;

    const [ingredients, setIngredients] = useState([]);
    const [ingredientPosition, setIngredientPosition] = useState(undefined);

    useEffect(() => {
        if(data != undefined && ingredientPosition != undefined){
            const position = data.recetas[ingredientPosition-1].ingredientes;
            setIngredients(position)
        }
    }, [ingredientPosition, data.codigo]);

    //  muestra la lista de los ingredientes seleccionados
    const ingPosition = (position) => {
        setIngredients([])
        setIngredientPosition(position);
    };

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
                </Modal.Body>
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default ModalPedido;