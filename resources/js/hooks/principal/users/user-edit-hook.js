import React, {useState, useEffect} from 'react';
import {useHomeDispatch, updateUser} from '../../../context';

const useUserEditForm = (user, validateForm) => {

    const dispatch = useHomeDispatch();

    const [userData, setUserData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        contrasena: '',
        img: '',
        avatar: undefined
    });

    useEffect(() => {
        setUserData({
            nombres: user.nombres,
            apellidos: user.apellidoP,
            email: user.email,
            contrasena: '',
            img: undefined,
            avatar: user.img
        })
    }, [user])

    const onChangeInput = (e) => {
        const name = e.target.name;
        let value;
        if(name == 'img'){
            value = e.target.files[0]
        }else{
            value = e.target.value
        }
        setUserData(userData => ({...userData, [name]: value}))
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const validate = validateForm()
        if(validate){
            //  datos a enviar
            const data = new FormData();
            data.append('nombres', userData.nombres);
            data.append('apellidos', userData.apellidos);
            data.append('email', userData.email);
            data.append('contrasena', userData.contrasena);
            data.append('img', userData.img);
            
            updateUser(dispatch, data)
        }
    }
    
    return {userData, onChangeInput, onSubmitForm}
}

export default useUserEditForm;