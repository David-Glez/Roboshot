import React, {useState, useEffect} from 'react';
import UserService from '../../../services/auth/servicioUsuarios';

const useUserUpdate = (id, validateForm, onSubmitData) => {

    const [userData, setUserData] = useState({
        loading: true,
        sending: false,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rfc: '',
        email: '',
        razonSocial: '',
        bd: '',
        user: '',
        resetPassword: false,
        newImg: undefined,
        oldImg: ''
    });
    
    useEffect(() => {
        const getData = async() => {
            const response = await UserService.infoCliente(id);
            if(response){
                setUserData({
                    loading: false,
                    sending: false,
                    nombre: response.data.nombre,
                    apellidoPaterno: response.data.apellidoPaterno,
                    apellidoMaterno: response.data.apellidoMaterno,
                    rfc: response.data.RFC,
                    email: response.data.email,
                    razonSocial: response.data.razonSocial,
                    bd: response.data.esquema,
                    user: response.data.usuario,
                    resetPassword: false,
                    newImg: undefined,
                    oldImg: response.data.logo
                })
            }
        }
        getData();
    }, []);

    //  changes on inputs
    const onChangeInput = (e) => {
        const name = e.target.name;
        let value ;

        switch(name){
            case 'newImg':
                value = e.target.files[0];
                break;
            case 'resetPassword':
                value = !userData.resetPassword
                break;
            case 'rfc':
                value = e.target.value.toUpperCase();
                break;
            default:
                value = e.target.value;
                break;
        }
        setUserData(userData => ({...userData, [name]:value}))
    }

    //  sends data to backend
    const onSubmitForm = (e) => {
        e.preventDefault();
        let responseData;
        const validate = validateForm();
        if(validate){
            setUserData(userData => ({...userData, ['sending']:true}))
            const data = new FormData();
            data.append('id', id);
            data.append('nombre', userData.nombre);
            data.append('apellidoPaterno', userData.apellidoPaterno);
            data.append('apellidoMaterno', userData.apellidoMaterno);
            data.append('rfc', userData.rfc);
            data.append('email', userData.email);
            data.append('razonSocial', userData.razonSocial);
            data.append('resetPass', userData.resetPassword);
            data.append('new_img', userData.newImg);
            data.append('old_img', userData.oldImg);

            const envio = UserService.editarCliente(data);
            envio.then((response) => {
                responseData = {
                    status: response.data.status,
                    mensaje: response.data.mensaje
                }
                setUserData(userData => ({...userData, ['sending']:response.data.status}))
                onSubmitData(responseData)
            });
        }
    }

    return{userData, onChangeInput, onSubmitForm}

}

export default useUserUpdate;