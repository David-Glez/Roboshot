import React, {useState} from 'react';
import AuthService from '../../../services/auth/autenticacion'

const useSignIn = (validateForm, onSubmitData) => {

    const [userData, setUserData] = useState({
        loading: false,
        user: '',
        password: ''
    })

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setUserData(userData => ({...userData, [name]: value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const validate = validateForm();
        let responseData;
        if(validate){
            setUserData(userData => ({...userData, ['loading']:true}));
            let credenciales = {
                nombre: userData.user,
                password: userData.password
            }
            const envio = AuthService.login(credenciales);
            envio.then((response) => {
                
                responseData = {
                    autorizado: response.autorizado,
                    id: response.idRol,
                    mensaje: response.mensaje
                }
                setUserData(userData => ({...userData, ['loading']:response.autorizado}));
                
                onSubmitData(responseData)
            });
        }
    }

    return {
        userData,
        onChangeInput,
        onSubmitForm
    }

}

export default useSignIn;