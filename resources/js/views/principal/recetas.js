import React, {useEffect} from 'react';

//  components
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardRecipe from '../../components/principal/cards/recipe-card';

//  context and custom hook
import {useHomeState, openModalSwitch, useHomeDispatch} from '../../context';
import useRecipesList from '../../hooks/principal/recipes/recipe-hook';

const Recipe = (props) => {
    const idCliente = props.location.idCliente;
    const settings = useHomeState();
    const {recipes} = useRecipesList(idCliente);
    const dispatch = useHomeDispatch();
    
    return(
        <>
        {(settings.loading && settings.module == 'recipes_page') ? (
            <div className = 'row superior'>
                <Loader />
            </div>
        ):(
            <div className = 'row'>
                {(recipes == '') ? (
                    <>
                    <div className = 'col-md-12 superior'>
                        <SinElementos />
                    </div>
                    </>
                ):(
                    <>
                    {recipes.map((x) =>
                        <CardRecipe
                            key = {x.id}
                            datos = {x}
                        /> 
                    )}
                    </>
                )}
            </div>
        )}

        
        </>
    )
};
/*

<div className="new-recipe">
            <button onClick = {(e) => openModalSwitch(dispatch, 'custom', idCliente, e)} >nueva receta</button>
        </div>
        */

export default Recipe;