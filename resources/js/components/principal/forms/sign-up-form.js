import React,  {useRef} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import validations from '../../../variables/admin/validations/form-validations';

//  toast
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//custom hook
import useSignUp from '../../../hooks/principal/sign-forms/sign-up-hook';

const SignUpForm = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    //  cerrar toast
    const cerrarToast = () =>{
        props.history.push('/');
    };

    const validateForm = () => {
        form.current.validateAll();
        if(checkBtn.current.context._errors.length == 0){
            return true;
        }else{
            return false;
        }
    }

    const onSubmitData = (response) => {
        if(response.status){
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

    const {
        userData, 
        onChangeInput,
        onSubmitForm, 
        selectYears, 
        selectMonths, 
        selectDays} = useSignUp(validateForm, onSubmitData)

    return(
        <>
        <div className = 'cardLogin card-containerLogin'>
            <h5 className="card-title">Registrate</h5>
            <h6 className="card-subtitle mb-2 text-muted">es totalmente gratis</h6>
            
            <Form onSubmit = {onSubmitForm} ref = {form}>
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
                                validations = {[validations.required]}
                                disabled = {userData.loading}
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
                                validations = {[validations.required]}
                                disabled = {userData.loading}
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
                                validations = {[validations.required]}
                                disabled = {userData.loading} 
                            />
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <div className = 'form-group'>
                            <small>Fecha de Nacimiento</small>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-3'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control'
                                name = 'diaN'
                                validations = {[validations.required]} 
                                onChange = {onChangeInput}
                                disabled = {userData.loading}
                                value = {userData.diaN}
                            >
                                <option value = ''>Día</option>
                                {selectDays()}
                            </Select>
                        </div>
                    </div>
                    <div className = 'col-sm-6'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control'
                                name = 'mesN'
                                validations = {[validations.required]} 
                                onChange = {onChangeInput}
                                disabled = {userData.loading}
                                value = {userData.mesN}
                            >
                                <option value = ''>Mes</option>
                                {selectMonths()}
                            </Select>
                        </div>
                    </div>
                    <div className = 'col-sm-3'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control '
                                name = 'yearN'
                                onChange = {onChangeInput}
                                validations = {[validations.required]}
                                disabled = {userData.loading}
                                value = {userData.yearN}
                            >
                                <option value = ''>Año</option>
                                {selectYears()}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <div className = 'form-group'>
                            <Input
                                type = 'text'
                                className = 'form-control validaReg'
                                name = 'usuario'
                                placeholder = 'Usuario' 
                                value = {userData.usuario}
                                onChange = {onChangeInput}
                                validations = {[validations.required]}
                                disabled = {userData.loading}
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
                                onChange = {onChangeInput}
                                validations = {[validations.required]}
                                disabled = {userData.loading} 
                            />
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-12 d-flex justify-content-center'>
                        <button className = 'btn btn-success' disabled = {userData.loading}>
                            {userData.loading && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Registrarte
                        </button>
                    </div>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
        </>
    )

}

export default SignUpForm;