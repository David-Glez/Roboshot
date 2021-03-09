import React, {useRef} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validations from '../../../variables/admin/validations/form-validations';
//  componentes
import Loader from '../../alertas/loader';
import {useHomeState, useHomeDispatch, closeModalSwitch} from '../../../context';
import useUserEditForm from '../../../hooks/principal/users/user-edit-hook';

const ModalUsuario = (props) => {
    const form = useRef();
    const checkB = useRef();
    const settings = useHomeState();
    const dispatch = useHomeDispatch();
    
    const validateForm = () => {
        form.current.validateAll();
        if(checkB.current.context._errors.length == 0){
            return true;
        }else{
            return false;
        }
    }

    const {userData, onChangeInput, onSubmitForm} = useUserEditForm(props.user, validateForm)

    if(settings.modal.open == true && settings.modal.name == 'user_details'){
        return(
            <>
            <Modal
                show = {settings.modal.open}
                onHide = {(e) => closeModalSwitch(dispatch, e)}
                size = 'lg'
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered'
                className = 'modalTransparente'
            >
                <Modal.Body>
                    <div className = 'cardLogin card-containerEdit'>
                        <h5 className="card-title">
                            Tus Datos
                            <button className = 'close float-right' onClick={(e) => closeModalSwitch(dispatch, e)}>
                                <span aria-hidden='true'>
                                    &times;
                                </span>
                            </button>
                        </h5>
                        <Form onSubmit = {onSubmitForm} ref = {form} encType="multipart/form-data">
                        <div className = 'row'>
                            <div className = 'col-md-6'>
                                <div className = 'row'>
                                    <div className = 'col-sm-6'>
                                        <div className = 'form-group'>
                                            <Input 
                                                type = 'text'
                                                className = 'form-control validaReg'
                                                name = 'nombres'
                                                placeholder="Nombre"
                                                value = {userData.nombres}
                                                onChange = {onChangeInput}
                                            />
                                        </div>
                                    </div>
                                    <div className = 'col-sm-6'>
                                        <div className = 'form-group'>
                                            <Input 
                                                type = 'text'
                                                className = 'form-control validaReg'
                                                name = 'apellidos'
                                                placeholder="Apellido"
                                                value = {userData.apellidos}
                                                onChange = {onChangeInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'form-group'>
                                            <Input
                                                type = 'email'
                                                className = 'form-control validaReg'
                                                name = 'email'
                                                placeholder = 'Correo Electrónico'
                                                value = {userData.email}
                                                onChange = {onChangeInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                        
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'form-group'>
                                            <Input
                                                type = 'password'
                                                className = 'form-control validaReg'
                                                name = 'contrasena'
                                                placeholder = 'Contraseña'
                                                value = {userData.contrasena}
                                                validations = {[validations.required]}
                                                onChange = {onChangeInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'form-group'>
                                            <small>
                                                **Ingresa tu contraseña para hacer validos los cambios
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className = 'col-md-6'>
                                <div className = 'row'>
                                    <div className = 'col-sm-12 imgPadre'>
                                        <div className = 'imageContent content-justify-center'>
                                        <img 
                                            src={userData.img ? URL.createObjectURL(userData.img) : userData.avatar } 
                                            alt={userData.img ? userData.img.name : null} 
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'custom-file'>
                                        <input type = 'file' id = 'img' name = 'img' className = 'custom-file-input' onChange = {onChangeInput} lang="es" />
                                        <label className="custom-file-label" htmlFor="img">Seleccionar...</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'row'>
                            <br/>
                        </div>
                        <div className = 'row'>
                            <div className = 'col-md-12 d-flex justify-content-center'>
                                <button className = 'btn btn-success' disabled = {settings.loading}>
                                    {(settings.loading && settings.module == 'sending_userdata') && (
                                        <span className = "spinner-border spinner-border-sm"></span>
                                    )}
                                    Actualizar
                                </button>
                            </div>
                        </div>
                        <CheckButton style={{ display: "none" }} ref = {checkB} />
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }else{
        return null;
    }
}

export default ModalUsuario;