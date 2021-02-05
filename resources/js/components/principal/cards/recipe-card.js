import React from 'react';

const CardRecipe = (props) => {

    const receta = props.datos;
    const cliente = props.cliente;

    const abrir = (idReceta, idCliente, e) => {
        e.preventDefault();
        props.abrirReceta(idReceta, idCliente)
    }

    return(
        <>
        <div className = 'col-sm-3 my-sm-2'>
            <div className = 'card mb-4 mb-sm-1'>
                <div className = 'recipeImage'>
                    <div className = 'contentImage'>
                    <img className = 'card-img-top ' src = {receta.img} alt = 'Card image cap' />
                    </div>
                </div>
                <div className = 'card-body'>
                    <h5 className = 'card-title'>{receta.nombre}</h5>
                    <span className = 'price'>${receta.precio}</span>
                    <p className = 'card-text text-muted'>{receta.descripcion}</p>
                    <div className = 'text-center'>
                        <button 
                            className = 'btn pedir'
                            onClick = {(e) => abrir(receta.idReceta, cliente, e)}>
                                Pedir 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardRecipe;