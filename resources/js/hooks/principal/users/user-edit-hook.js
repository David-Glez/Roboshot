import React, {useState, useEffect} from 'react';

const useUserEditForm = (user) => {
    
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
        console.log('do something')
    }
    
    return {userData, onChangeInput, onSubmitForm}
}

export default useUserEditForm;