import React, {useState, useRef, useEffect} from 'react';
//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';

//  libreria toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner, ToggleButtonGroup, ToggleButton}from 'react-bootstrap';

const required = (value) =>{
    if(!value){
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};

const macAddress = (value) => {
    var regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const isMac = regex.test(value);
    if(!isMac){
        return(
            <small className = 'text-danger' role = 'alert'>
                Formato inválido
            </small>
        )
    }
}

const RoboshotsUpdate = (props) => {
    const checkRef = useRef();
    const form = useRef();

    const editar = props.editar;

    const id = props.location.idRob;

    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [mac, setMac] = useState('');
    const [estado, setEstado] = useState(undefined);
    const [cliente, setCliente] = useState(0);
    const [nombreCliente, setNombreCliente] = useState('')
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        const inicio = async() => {
            const info = await UserService.infoRoboshot(id);
            if(info){
                setMac(info.data.mac);
                setCliente(info.data.idCliente);
                setNombreCliente(info.data.cliente);
                setNombre(info.data.nombre)
                setEstado(info.data.estado)
                setCargando(false);
            }
        }
        inicio()
    },[]);

    const onChangeMac = (e) => {
        const dir = e.target.value;
        setMac(dir.toUpperCase())
    }

    const onChangeEstado = (e) => {
        
        setEstado(e)
    }
    const onChangeNombre = (e) => {
        const name = e.target.value;
        setNombre(name)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if(checkRef.current.context._errors.length == 0){
            let data = {
                idRob: id,
                idCliente: cliente,
                mac: mac,
                nombre: nombre,
                estado: estado
            }
            
            const status = editar(data)
            
        }else{
            setLoading(false);
        }
    }

    return(
        <>
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} ref = {form} encType="multipart/form-data" >
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Estación
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <button className = 'btn btn-success float-right' disabled = {loading}>
                            {loading && (
                                <span className = "spinner-border spinner-border-sm"></span>
                            )}
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {cargando ? (
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
                                        <option value = {cliente}>
                                            {nombreCliente}
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
                                        value = {mac}
                                        placeholder = 'AA:BB:CC:DD:EE:FF'
                                        maxLength = '17'
                                        onChange = {onChangeMac}
                                        disabled = {loading}
                                        validations = {[macAddress]}
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
                                        value = {nombre}
                                        disabled = {loading}
                                        validations = {[required]}
                                        onChange = {onChangeNombre}
                                    />
                                </div>
                            </div>
                            <div className = 'form-group row'>
                                <label htmlFor = 'nombre' className = 'col-sm-4'>
                                    Estado de la estación
                                </label>
                                <div className = 'col-sm-8'>
                                    <ToggleButtonGroup type="radio" name="estado" defaultValue={estado} onChange={onChangeEstado}>
                                        <ToggleButton
                                            variant="outline-success"
                                            value = {true}
                                            checked = {estado}
                                        >
                                            Activo
                                        </ToggleButton>
                                        <ToggleButton
                                            variant="outline-danger"
                                            value = {false}
                                            checked = {estado}
                                        >
                                            Inactivo
                                        </ToggleButton>
                                    </ToggleButtonGroup>
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