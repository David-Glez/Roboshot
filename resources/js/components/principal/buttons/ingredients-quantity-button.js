import React from 'react';

const IngredientQuantity = (props) => {

    const quantity = props.quantity;

    return(
        <>
        <span>
        {quantity} Ml
        </span>
        
        </>
    )

}

export default IngredientQuantity;