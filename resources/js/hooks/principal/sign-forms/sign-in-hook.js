import React, {useState} from 'react';
import {useAuthDispatch, loginUser} from '../../../context';
const useSignIn = (validateForm) => {
    const dispatch = useAuthDispatch();
    const [userData, setUserData] = useState({
        nombre: '',
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
        if(validate){
            loginUser(dispatch, userData)
        }
    }

    return {
        userData,
        onChangeInput,
        onSubmitForm
    }

}

export default useSignIn;