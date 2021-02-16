import React, { useRef} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import PasswordStrengthBar from 'react-password-strength-bar';
import validation from '../../../variables/admin/validations/form-validations';
 
//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import camera from '../../../assets/img/camera.jpg';

//  custom hook
import useUserRegister from '../../../hooks/admin/users/user-register-hook';

const UsersAdd = (props) => {
    const imgRef = useRef();
    const checkBtn = useRef();
    const formRef = useRef();

    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        props.history.push('/admin/usuarios');
    }

    //  validate form
    const validateForm = () => {
        formRef.current.validateAll();
        if(checkBtn.current.context._errors.length == 0){
            return true;
        }else{
            return false;
        }
    }

    //  response of API
    const onSubmitData = (response) => {
        if(response.status == true){
            toast.success(response.mensaje,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined,
                onClose: () => cerrarToast()
            });
        }else{
            let mensajes = response.mensaje;
            mensajes.forEach((item) => {
                toast.warning(item,{
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
            });
        }
    }
    const {userData, onChangeInput, onSubmitForm} = useUserRegister(validateForm, onSubmitData);

    return(
        <>
        
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} encType="multipart/form-data" ref = {formRef}>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Añadir Usuario
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {userData.loading}>
                            {userData.loading && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                <div className = 'row'>
                    <div className = 'col-md-6'>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Nombre(s)
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'nombre'
                                    name = 'nombre'
                                    value = {userData.nombre}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'apellidoPaterno' className = 'col-sm-4'>
                                Apellido Paterno
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'apellidoPaterno'
                                    name = 'apellidoPaterno'
                                    value = {userData.apellidoPaterno}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'apellidoMaterno' className = 'col-sm-4'>
                                Apellido Materno
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'apellidoMaterno'
                                    name = 'apellidoMaterno'
                                    value = {userData.apellidoMaterno}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'razonSocial' className = 'col-sm-4'>
                                Razón Social
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'razonSocial'
                                    name = 'razonSocial'
                                    value = {userData.razonSocial}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'rfc' className = 'col-sm-4'>
                                RFC
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'rfc'
                                    name = 'rfc'
                                    value = {userData.rfc}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required, validation.validateRFC]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'email' className = 'col-sm-4'>
                                E-mail
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'email'
                                    className = 'form-control'
                                    id = 'email'
                                    name = 'email'
                                    value = {userData.email}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'bd' className = 'col-sm-4'>
                                Nombre Base de Datos
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'bd'
                                    name = 'bd'
                                    maxLength = '10'
                                    value = {userData.bd}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                                <small>Evite espacios y máyusculas, mínimo 4 caracteres</small>
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-sm-12 imgPadre'>
                                <div className = 'imageContent content-justify-center'>
                                    <img 
                                    src={userData.img ? URL.createObjectURL(userData.img) : camera } 
                                    alt={userData.img ? userData.img.name : null}/>
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'img' className = 'col-sm-4'>
                                Logo
                            </label>
                            <div className = 'col-sm-8'>
                                <div className = 'custom-file'>
                                    <input type = 'file' id = 'img' name = 'img' className = 'custom-file-input' ref = {imgRef} onChange = {onChangeInput}/>
                                    <label className="custom-file-label" htmlFor="img">Seleccionar...</label>
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'user' className = 'col-sm-4'>
                                Usuario
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'user'
                                    name = 'user'
                                    value = {userData.user}
                                     onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'contrasena' className = 'col-sm-4'>
                                Contraseña
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'password'
                                    className = 'form-control'
                                    id = 'contrasena'
                                    name = 'contrasena'
                                    value = {userData.contrasena}
                                    onChange = {onChangeInput}
                                    disabled = {userData.loading}
                                    validations = {[validation.required]}
                                />
                                <PasswordStrengthBar 
                                    password = {userData.contrasena} 
                                    scoreWords = {['débil', 'débil', 'bien', 'fuerte', 'muy fuerte']}
                                    shortScoreWord = 'muy corta'
                                />
                                <small>
                                    Asegúrese de guardar su contraseña
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
        </>
    )
};

export default UsersAdd;