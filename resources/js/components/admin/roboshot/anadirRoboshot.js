import React, {useState, useEffect, useRef} from 'react';

//Elementos del formulario
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

//funciones consultas a bd y localStorage
import UserService from '../../../services/auth/servicioUsuarios';
import AuthService from '../../../services/auth/autenticacion';

//iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//Estilos de tabla
import {Table, Spinner}from 'react-bootstrap';

//libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const required = (value) =>{
    if(!value){
        return(
            <div className = 'alert alert-danger' role="alert">
                Este campo es requerido
            </div>
        )
    }
};

const AnadirRoboshot = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    const [mac, setMac] = useState('');
    const [nombre, setNombre] = useState('');
    const [cliente, setCliente] = useState(0);
    const [lista, setLista] = useState([]);

    // trae la lista de clientes registrados
    useEffect(() => {
        const inicio = async() =>{
            const result = await UserService.clientes();
            setLista(result.data)
        }
        inicio();
    }, []);

    // opciones del select
    const opciones = () => {
        return lista.map(data => {
            return(
                <option key = {data.idCliente} value = {data.idCliente}>
                    {data.nombre}
                </option>
            );
        });
    };

    // captura de direccion MAC
    const onChangeMAC = (e) => {
        const mac = e.target.value;
        setMac(mac);
    };

    // captura de nombre de roboshot
    const onChangeNombre = (e) => {
        const nombre = e.target.value;
        setNombre(nombre);
    };

    // captura del cliente
    const onChangeCliente = (e) => {
        const cliente = e.target.value;
        setCliente (cliente);
        console.log(cliente)
    };

    // envio del formulario
    const onSubmitForm = (e) => {
        // evita la recarga de la pagina
        e.preventDefault();

        //  recopilacion de datos
        let data = {
            idCliente: cliente,
            mac: mac,
            nombre: nombre
        };

        console.log(data)
    };

    return(
        <>
        <ToastContainer />
        <div className = 'card card-primary card-outline'>
            <div className = 'card-header'>
                <h3 className = 'card-title'>
                    Añadir Roboshot
                </h3>
            </div>
            <Form onSubmit = {onSubmitForm} ref = {form}>
                <div className = 'card-body'>
                    <div className = 'row'>
                        <div className = 'form-group col-sm-4'>
                            <label>Cliente</label>
                            <Select
                                className = 'form-control'
                                name = 'cliente'
                                validations = {[required]} 
                                onChange = {onChangeCliente}
                            >
                                <option value = ''>Selecciona una opción</option>
                                {opciones()}
                            </Select>
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>Dirección física (MAC)</label>
                            <Input 
                                className = 'form-control'
                                type = 'text'
                                name = 'MAC'
                                value = {mac}
                                onChange = {onChangeMAC}
                                validations = {[required]}
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>Nombre roboshot</label>
                            <Input 
                                className = 'form-control'
                                type = 'text'
                                name = 'nombre'
                                value = {nombre}
                                onChange = {onChangeNombre}
                                validations = {[required]}
                            />
                        </div>
                    </div>
                </div>
                <div className = 'card-footer'>
                    <button className = 'btn btn-outline-success'>
                        Añadir Roboshot
                    </button>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            
        </div>
        </>
    )
};

export default AnadirRoboshot;