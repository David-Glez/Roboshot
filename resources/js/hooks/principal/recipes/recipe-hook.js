import React, {useState, useEffect} from 'react';
import {useHomeDispatch, recipesStation} from '../../../context';

const useRecipesList = (id) => {
    const dispatch = useHomeDispatch();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const index = async() => {
            try{
                const lista = await recipesStation(dispatch, id);
                if(lista.status == 200){
                    dispatch({type: 'RECIPES_CHARGED'})
                    setRecipes(lista.data);
                }
            }catch(error){
                dispatch({type: 'ERROR_LOAD'})
                console.log(error)
            }
        }
        index()
    }, []);

    return {recipes}
}

export default useRecipesList