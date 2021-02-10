import React, {useState, useEffect} from 'react';

//  API 
import UserService from '../../services/auth/servicioUsuarios';

const useRecipeEdit = (data) => {

    const [dataForm, setDataForm] = useState({
        loading: true, 
        sending: false,
        id: data.id,
        name: '',
        description: '',
        roboshot: '',
        ingredients: [],
        img: '',
        price: '',
        mix: undefined,
        state: undefined,
        newImg: undefined

    });

    //  charges recipe content once time
    useEffect(() => {
        const index = async() => {
            const response = await UserService.recipe(data);
            if(response){
                setDataForm({
                    loading: false,
                    sending: false, 
                    id: data.id,
                    name: response.data.nombre,
                    description: response.data.descripcion,
                    roboshot: response.data.roboshot,
                    ingredients: response.data.ingredientes,
                    img: response.data.img,
                    price: response.data.precio,
                    mix: response.data.mezclar,
                    state: response.data.activa,
                    newImg: undefined
                });
            }
        }
        index()
    }, []);

    //  modify select field
    const onChangeInput = (e) => {
        console.log(e.target)
        /*const name = e.target.name;
        let value = '';
        if(name == 'newImg'){
            value = e.target.files[0];
        }else{
            value = e.target.value;
        }
        setDataForm(dataForm => ({...dataForm, [name]:value}))*/
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        setDataForm(dataForm => ({...dataForm, ['sending']:true}))
        
    }

    return {dataForm, onChangeInput, onSubmitForm}

}

export default useRecipeEdit;