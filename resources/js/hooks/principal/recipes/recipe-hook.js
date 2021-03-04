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
                    dispatch({type: 'RECIPES_CHARGED', id_client: id})
                    setRecipes(lista.data);
                }
            }catch(error){
                dispatch({
                    type: 'CATCH_ERROR',
                    errorCode: 101,
                    errorMessage: 'Error al cargar recetas'
                })

            }
        }
        index()
    }, []);

    return {recipes}
}

export default useRecipesList