import React, {useRef, useEffect} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validations from '../../../variables/admin/validations/form-validations';

//  custom hook
import useSignIn from '../../../hooks/principal/sign-forms/sign-in-hook';
//  context
import {useAuthState} from '../../../context'

//  toast
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  estilos 
import user from '../../../assets/img/user.png';

const SignInForm = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const userDetails = useAuthState();

    useEffect(() => {
        if(userDetails.access != undefined){
            if(userDetails.access == true){
                switch(userDetails.id_rol){
                    case 1:
                        props.history.push('/admin');
                    break;
                    case 2:
                        //console.log('En construccion');
                        props.history.push('/admin');
                    break;
                    case 4:
                        props.history.push('/');
                    break;
                }
            }else{
                toast.warning(userDetails.errorMessage,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined
                });
            }
        }
    }, [userDetails.access]);
    const validateForm = () => {
        form.current.validateAll();
        if(checkBtn.current.context._errors.length == 0){
            return true;
        }else{
            return false;
        }
    }
    const {userData, onChangeInput, onSubmitForm} = useSignIn(validateForm);

    return(
        <>
        <div className = "cardLogin card-containerLogin">
            <img src = {user} alt="profil-img" className="profile-img-card" />
            <Form onSubmit = {onSubmitForm} ref = {form}>
                <div className = 'form-group'>
                    <label htmlFor = "userName">Usuario</label>
                    <Input
                        type = 'text'
                        className = 'form-control'
                        name = 'nombre'
                        value = {userData.nombre}
                        onChange = {onChangeInput}
                        validations = {[validations.required]}
                    />
                </div>
                <div className = 'form-group'>
                    <label htmlFor = 'contrasena'>Contraseña</label>
                    <Input
                        type = 'password'
                        className = 'form-control'
                        name = 'password'
                        value = {userData.password}
                        onChange = {onChangeInput}
                        validation = {[validations.required]}
                    />
                </div>
                <div className = 'form-group'>
                    <button className = 'btn btn-primary' disabled = {userDetails.loading}>
                        {userDetails.loading && (
                            <span className = "spinner-border spinner-border-sm"></span>
                        )}
                        <span>Iniciar Sesión</span>
                    </button>
                </div>

                <CheckButton style={{ display: "none" }} ref={checkBtn}/>
            </Form>
        </div>
        </>
    )
}

export default SignInForm;