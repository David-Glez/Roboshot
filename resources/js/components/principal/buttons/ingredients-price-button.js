import React from 'react';

const IngredientPrice = (props) => {
    const price = props.price;

    return(
        <>
        <span className = 'text-success'>
        ${parseFloat(price).toFixed(2)}
        </span>
        </>
    )
}

export default IngredientPrice;