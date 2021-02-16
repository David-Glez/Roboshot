import React, {useRef} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validations from '../../../variables/admin/validations/form-validations';

//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner}from 'react-bootstrap';

//  custom hook
import useUserUpdate from '../../../hooks/admin/users/user-edit-hook';

const UsersUpdate = (props) => {
    const formUp = useRef();
    const checkBtn = useRef();

    const idUser = props.location.idUsuario;
    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        //props.cerrarLoading();
        props.history.push('/admin/usuarios');
    }

    const validateForm = () => {
        formUp.current.validateAll();
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

    const {userData, onChangeInput, onSubmitForm} =  useUserUpdate(idUser, validateForm, onSubmitData);

    return(
        <>
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} encType="multipart/form-data" ref = {formUp}>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Usuario
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {userData.sending}>
                            {userData.sending && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {userData.loading ? (
                    <>
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'secondary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    </>
                ):(
                    <>
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required]}
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required]}
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required]}
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required]}
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required, validations.validateRFC]}
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
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                    validations = {[validations.required]}
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
                                    value = {userData.bd}
                                    disabled 
                                />
                                <small>Este espacio no es editable</small>
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-sm-12 imgPadre'>
                                <div className = 'imageContent content-justify-center'>
                                    <img 
                                        src={userData.newImg ? URL.createObjectURL(userData.newImg) : userData.oldImg } 
                                        alt={userData.newImg ? userData.newImg.name : null} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'img' className = 'col-sm-4'>
                                Logo
                            </label>
                            <div className = 'col-sm-8'>
                                <div className = 'custom-file'>
                                    <input type = 'file' id = 'img' name = 'newImg' className = 'custom-file-input' onChange = {onChangeInput} lang="es" />
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
                                    disabled 
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'resetPassword' className = 'form-check-label col-sm-6'>
                                    Reiniciar Contraseña
                            </label>
                            <div className = 'form-check col-sm-6'>
                                <Input
                                    type = 'checkbox'
                                    className = 'form-check-input position-static'
                                    id = 'resetPassword'
                                    name = 'resetPassword'
                                    value = {userData.resetPassword}
                                    disabled = {userData.sending}
                                    onChange = {onChangeInput}
                                />
                                
                            </div>
                            <small>
                                La contraseña predeterminada es rob0sh0t-1nt3gr@
                            </small>
                        </div>
                    </div>
                    </div>
                    </>
                )}
            </div>
            <CheckButton style={{ display: "none" }} ref = {checkBtn}/>
            </Form>
        </div>
        </>
    )
}

export default UsersUpdate;