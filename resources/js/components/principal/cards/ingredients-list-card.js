import React from 'react';

//  components
import IngredientsListTable from '../tables/ingredients-list-table';

const IngredientsList = (props) => {

    const ingredients = props.ingredients;

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                Ingredientes
            </div>
            <div className = 'card-body'>
                <div className = 'table-responsive'>
                <IngredientsListTable 
                    ingredients = {ingredients}
                />
                </div>
                
            </div>
        </div>
        </>
    )

}

export default IngredientsList;