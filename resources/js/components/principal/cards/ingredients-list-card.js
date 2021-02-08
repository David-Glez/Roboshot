import React from 'react';

//  components
import IngredientsListTable from '../tables/ingredients-list-table';

const IngredientsList = (props) => {

    const ingredients = props.ingredients;

    console.log(ingredients)

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                Ingredientes
            </div>
            <div className = 'card-body'>
                <IngredientsListTable 
                    ingredients = {ingredients}
                />
            </div>
        </div>
        </>
    )

}

export default IngredientsList;