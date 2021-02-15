import React, {useState, useEffect} from 'react';

//  API 
import UserService from '../../services/auth/servicioUsuarios';

const useRecipeEdit = (data, onSubmitData) => {

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
            const response = await UserService.recipe(data.id, data.robot);
            if(response){
                console.log(response.data)
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
        const name = e.target.name;
        let value;
        switch(name){
            case 'newImg':
                value = e.target.files[0]
            break;
            case 'state':
                if(e.target.value == 'true'){
                    value = true;
                }
                if(e.target.value == 'false'){
                    value = false
                }
            break;
            case 'mix':
                if(e.target.value == 'true'){
                    value = true;
                }
                if(e.target.value == 'false'){
                    value = false
                }
            break;
            default:
                value = e.target.value
            break;
        }
        setDataForm(dataForm => ({...dataForm, [name]:value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        setDataForm(dataForm => ({...dataForm, ['sending']:true}))
        //  send data to backend
        let data = new FormData();
        let responseData;
        data.append('id', dataForm.id)
        data.append('name', dataForm.name)
        data.append('description', dataForm.description)
        data.append('mix', dataForm.mix)
        data.append('state', dataForm.state);
        data.append('newImg', dataForm.newImg);
        data.append('roboshot', dataForm.roboshot);
        data.append('price', dataForm.price)
        const send = UserService.updateRecipe(data);
        send.then((response) => {
            
            if(response.data.status == true){
                responseData = {
                    status: response.data.status,
                    mensaje: response.data.mensaje
                }
            }else{
                responseData = {
                    status: response.data.status,
                    mensaje: response.data.mensaje
                }
                setDataForm(dataForm => ({...dataForm, ['sending']:false}))
            }
            onSubmitData(responseData);
        })
    }

    return {dataForm, onChangeInput, onSubmitForm}

}

export default useRecipeEdit;