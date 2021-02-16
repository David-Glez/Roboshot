import React, {useState, useRef, useEffect} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import validations from '../../../variables/admin/validations/form-validations'

//  custom hook
import useEditRoboshot from '../../../hooks/admin/roboshots/roboshot-edit-hook';

//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner, ButtonGroup, ToggleButton}from 'react-bootstrap';

const RoboshotsUpdate = (props) => {
    const checkRef = useRef();
    const form = useRef();
    const id = props.location.idRob;
    const [state, setState] = useState('')

    const validateForm = () => {
        form.current.validateAll();
        if(checkRef.current.context._errors.length == 0){
            return true;
        }else{
            return false;
        }
    }
    
    const cerrar = () => {
        props.history.push('/admin/roboshots')
    }

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
                onClose: () => cerrar()
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

    const {roboshotData, onChangeInput, onSubmitForm} = useEditRoboshot(id, validateForm, onSubmitData)
    useEffect(() => {
        if(roboshotData.estado === true){
            setState({
                activo: true,
                inactivo: false
            })
        }
        if(roboshotData.estado === false){
            setState({
                activo: false,
                inactivo: true
            });
        }
    },[roboshotData.estado]);

    return(
        <>
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} ref = {form}  >
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Estación
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {roboshotData.sending}>
                            {roboshotData.sending && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {roboshotData.loading ? (
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
                        <div className = 'col-md-8'>
                            <div className = 'form-group row'>
                                <label htmlFor = 'cliente' className = 'col-sm-4'>
                                    Cliente
                                </label>
                                <div className = 'col-sm-8'>
                                    <Select
                                        className = 'form-control'
                                        name = 'cliente'
                                        disabled = {true}
                                    >
                                        <option value = {roboshotData.id}>
                                            {roboshotData.cliente}
                                        </option>
                                    </Select>
                                </div>
                            </div>
                            <div className = 'form-group row'>
                                <label htmlFor = 'mac' className = 'col-sm-4'>
                                    Dirección Física
                                </label>
                                <div className = 'col-sm-8'>
                                    <Input
                                        className = 'form-control'
                                        name = 'mac'
                                        value = {roboshotData.mac}
                                        placeholder = 'AA:BB:CC:DD:EE:FF'
                                        maxLength = '17'
                                        onChange = {onChangeInput}
                                        disabled = {roboshotData.sending}
                                        validations = {[validations.validateMAC]}
                                    />
                                    <small>
                                        ingrese : o - entre dos caracteres
                                    </small>
                                </div>
                            </div>
                            <div className = 'form-group row'>
                                <label htmlFor = 'nombre' className = 'col-sm-4'>
                                    Nombre para la estación
                                </label>
                                <div className = 'col-sm-8'>
                                    <Input
                                        type = 'text'
                                        className = 'form-control'
                                        id = 'nombre'
                                        name = 'nombre'
                                        value = {roboshotData.nombre}
                                        disabled = {roboshotData.sending}
                                        validations = {[validations.required]}
                                        onChange = {onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className = 'form-group row'>
                                <label htmlFor = 'nombre' className = 'col-sm-4'>
                                    Estado de la estación
                                </label>
                                <div className = 'col-sm-8'>
                                    <ButtonGroup toggle>
                                        <ToggleButton
                                            type="radio"
                                            variant="outline-success"
                                            name="estado"
                                            value={true}
                                            checked={state.activo}
                                            onChange={onChangeInput}
                                            disabled = {roboshotData.sending}
                                        >
                                            Activo
                                        </ToggleButton>
                                        <ToggleButton
                                            type="radio"
                                            variant="outline-danger"
                                            name="estado"
                                            value={false}
                                            checked={state.inactivo}
                                            onChange={onChangeInput}
                                            disabled = {roboshotData.sending}
                                        >
                                            Inactivo
                                        </ToggleButton>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-md-4'>
                            <div className = 'row'>
                                aqui puede ir un logo
                            </div>
                        </div>
                    </div>
                    </>
                )}
                
            </div>
            <CheckButton style={{ display: "none" }} ref = {checkRef} />
            </Form>
        </div>
        </>
    )
}

export default RoboshotsUpdate;