import React, {useState} from 'react';

import UserService from '../../services/auth/servicioUsuarios';

const useUserRegister = (validateForm, onSubmitData) => {

    const [userData, setUserData] = useState({
        loading: false,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rfc: '',
        email: '',
        razonSocial: '',
        bd: '',
        user: '',
        contrasena: '',
        img: undefined
    });

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value;
        switch(name){
            case 'img':
                value = e.target.files[0];
                break;
            case 'rfc':
                value = e.target.value.toUpperCase()
                break;
            case 'bd':
                value = e.target.value.toLowerCase()
                break;
            default:
                value = e.target.value;
                break;
        }

        setUserData(userData => ({...userData, [name]:value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const validate = validateForm();
        let responseData;
        if(validate){
            setUserData(userData => ({...userData, ['loading']:true}))
            const data = new FormData();
            data.append('nombre', userData.nombre);
            data.append('apellidoPaterno', userData.apellidoPaterno);
            data.append('apellidoMaterno', userData.apellidoMaterno);
            data.append('rfc', userData.rfc);
            data.append('email', userData.email);
            data.append('razonSocial', userData.razonSocial);
            data.append('bd', userData.bd);
            data.append('user', userData.user);
            data.append('password', userData.contrasena);
            data.append('img', userData.img);

            //  sending data to backend
            const send = UserService.nuevoCliente(data);
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
                    setUserData(userData => ({...userData, ['loading']:false}))
                }
                onSubmitData(responseData)
            })
        }
    }

    return {userData, onChangeInput, onSubmitForm}

}

export default useUserRegister;