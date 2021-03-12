import React from 'react';

const RecipeList = (props) => {

    const recipes = props.recipes;
    const code = props.code;
    const ingredientsList = props.seeIngredients;

    //  return ingredients list from select recipe
    const ingredientsRecipe = (e, prod, cod) => {
        ingredientsList(prod);
    }

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                Recetas
            </div>
            <div className = 'card-body'>
                <ul className = 'list-group scrollDiv'>
                    {recipes.map((item, index) => {
                        return(
                            
                            <li className = 'list-group-item' key = {index} >
                                <div style = {{cursor:'pointer'}} onClick = {(e) => ingredientsRecipe(e, item.idProd, code)} >
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
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        </>
    )
}

export default RecipeList;