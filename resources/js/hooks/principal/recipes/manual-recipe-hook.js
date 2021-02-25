import React, {useState, useEffect} from 'react'
import {useHomeDispatch, ingredientsClient, useHomeState} from '../../../context';

const useManualRecipe = () => {
    const dispatch = useHomeDispatch();
    const settings = useHomeState();
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    console.log(settings)

    

    useEffect(() => {
        const index = async() => {
            try{
                const resp = await ingredientsClient(dispatch, settings.modal.data);
                console.log(resp)
    
            }catch(error){
                dispatch({type: 'ERROR_LOAD'})
                console.log(error)
            }
        }
        index()
    }, []);

    return {
        ingredients, 
        categories
    }
}

export default useManualRecipe