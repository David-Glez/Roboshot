import React from 'react';

const CategoriasCard = (props) => {

    const categorias = props.categorias;
    const ingredienteCategoria = props.verIngredientes;

    const listaIngredientes = (id, e) => {
        ingredienteCategoria(id)
    }

    return(
        <>
        <ul className = 'list-group list-group-flush scrollDiv'>
            {categorias.map((item, index) => {
                return(
                    <a 
                        key = {index}
                        className = 'list-group-item list-group-item-action'
                        onClick = {(e) => listaIngredientes(item.idCategoria, e)}
                    >
                        {item.nombre}
                    </a>
                )
            })}
        </ul>
        </>
    )
}

export default CategoriasCard;