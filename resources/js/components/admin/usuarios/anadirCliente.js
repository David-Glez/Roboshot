import React, {useState, useRef} from 'react';

//elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

//funciones consultas a bd y localStorage
import UserService from '../../../services/auth/servicioUsuarios';

//libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Estilos
import {Spinner}from 'react-bootstrap';

const required = (value) =>{
    if(!value){
        return(
            <div className = 'alert alert-danger' role="alert">
                Este campo es requerido
            </div>
        )
    }
};

const AnadirCliente = (props) =>{

    const form = useRef();
    const checkBtn = useRef();

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPat] = useState('');
    const [apellidoMaterno, setApellidoMat] = useState('');
    const [rfc, setRFC] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confPass, setConfPass] = useState('');
    const [esquema, setEsquema] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');

    //captura del nombre
    const onChangeNombre = (e) => {
        const nombreForm = e.target.value;
        setNombre(nombreForm);
    };

    //captura del apellido paterno
    const onChangeApellidoPat = (e) => {
        const apellidoPatForm = e.target.value;
        setApellidoPat(apellidoPatForm);
    };

    //captura del apellido materno
    const onChangeApellidoMat = (e) => {
        const apellidoMatForm = e.target.value;
        setApellidoMat(apellidoMatForm);
    };

    //captura de RFC
    const onChangeRFC = (e) => {
        const RFC = e.target.value;
        setRFC(RFC);
    };

    //captura del email
    const onChangeEmail = (e) => {
        const correo = e.target.value;
        setEmail(correo);
    };

    //captura del email
    const onChangeEsquema = (e) => {
        const esquema = e.target.value;
        setEsquema(esquema);
    };

    //captura de nombre de usuario
    const onChangeUsuario = (e) => {
        const userName = e.target.value;
        setUsuario(userName);
    };

    //captura de contraseña
    const onChangeContrasena = (e) => {
        const password = e.target.value;
        setContrasena(password);
    };

    //confirma contraseña
    const onChangeConfContra = (e) => {
        const confirma = e.target.value;
        setConfPass(confirma);
    };

    //cerrar toast
    const cerrarToast = () =>{
        props.history.push('/admin/clientes');
    };

    //  disponiblidad para nombre de roboshot
    const roboshotDisponible = (e) => {
        setLoading(true);

        let dato = {
            esquema: esquema
        }
        const envio = UserService.disponible(dato);

        envio.then((response) => {
            console.log(response.data)
        })
        
    };

    //envio del formulario
    const onSubmitForm = (e) => {
        //evita recargar la pagina
        e.preventDefault();

        //recopila los datos
        let data = {
            nombres: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            rfc: rfc,
            email: email,
            esquema: esquema,
            usuario: usuario,
            contrasena: contrasena
        };

        //validacion de campos del formulario
        form.current.validateAll();
        if(checkBtn.current.context._errors.length == 0){
            
            const envio = UserService.nuevoCliente(data);
            envio.then((response) =>{
               
                //si se insertó correctamente
                if(response.data.insertado == true){
                    toast.success(response.data.mensaje,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                        hideProgressBar: false,
                        newestOnTop: false,
                        closeOnClick: true,
                        rtl: false,
                        draggable: true,
                        pauseOnHover: true,
                        onClose: () => cerrarToast()
                    });
                    
                }else{
                    //mensaje de usuario repetido
                    toast.error(response.data.mensaje);
                }                
            });    
        }else{
            
        }
    };

    return(
        <>
        <ToastContainer />
        <div className = 'card card-primary card-outline'>
            <div className = 'card-header'>
                <h3 className = 'card-title'>
                    Añadir Nuevo Cliente
                </h3>
            </div>
            <Form onSubmit = {onSubmitForm} ref = {form}>
                <div className = 'card-body'>
                    <div className = 'row'>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Nombre(s)
                            </label>
                            <Input 
                                className = 'form-control'
                                type = 'text'
                                name = 'nombres'
                                value = {nombre}
                                onChange = {onChangeNombre}
                                validations = {[required]}
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Apellido Paterno
                            </label>
                            <Input
                                className = 'form-control'
                                type = 'text' 
                                name = 'apellidoPaterno'
                                value = {apellidoPaterno}
                                onChange = {onChangeApellidoPat}
                                validations = {[required]}
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Apellido Materno
                            </label>
                            <Input
                                className = 'form-control'
                                type = 'text'
                                name = 'apellidoMaterno'
                                value = {apellidoMaterno}
                                onChange = {onChangeApellidoMat}
                                validations = {[required]} 
                            />
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                RFC
                            </label> 
                            <Input
                                className = 'form-control'
                                type = 'text'
                                name = 'RFC'
                                value = {rfc}
                                onChange = {onChangeRFC}
                                validations = {[required]}
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                E-Mail
                            </label>
                            <Input
                                className = 'form-control'
                                type = 'email'
                                name = 'email'
                                value = {email}
                                onChange = {onChangeEmail}
                                validations = {[required]} 
                            />
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Nombre para base de datos
                            </label>
                            
                            <Input
                                className = 'form-control'
                                type = 'text'
                                name = 'esquema'
                                value = {esquema}
                                onChange = {onChangeEsquema}
                                validations = {[required]} 
                            />
                            <a className = 'btn btn-success' onClick = {() => roboshotDisponible()}>
                                Verificar Dispoonibilidad
                            </a>
                            
                        </div>
                        <div className = 'form-group col-sm-4'>
                            
                            {loading ? (
                                <div className = 'text-center'>
                                    <Spinner animation = 'border' variant = 'primary' role = 'status'>
                                        <span className = 'sr-only'>Cargando...</span>
                                    </Spinner>
                                </div>
                            ):(
                                <label className = 'text-success'>{mensaje}</label>
                            )}
                            
                        </div>
                    </div>
                </div>
                
                <div className = 'card-header'>
                    <h3 className = 'card-title'>
                        Datos de Inicio de Sesión
                    </h3>
                </div>
                <div className = 'card-body'>
                    <div className = 'row'>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Usuario
                            </label>
                            <Input
                                className = 'form-control'
                                type = 'text'
                                name = 'usuario'
                                value = {usuario}
                                onChange = {onChangeUsuario}
                                validations = {[required]} 
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Contraseña
                            </label>
                            <Input
                                className = 'form-control '
                                type = 'password'
                                name = 'contrasena'
                                value = {contrasena}
                                onChange = {onChangeContrasena}
                                validations = {[required]} 
                            />
                        </div>
                        <div className = 'form-group col-sm-4'>
                            <label>
                                Confirma Contraseña
                            </label>
                            <Input
                                className = 'form-control'
                                type = 'password'
                                name = 'confirmaContra'
                                value = {confPass} 
                                onChange = {onChangeConfContra}
                                validations = {[required]}
                            />
                        </div>
                    </div>
                </div>
                <div className = 'card-footer'>
                    <button className = 'btn btn-outline-success'>
                        Añadir Cliente
                    </button>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            
        </div>   
        </>
    )
};

export default AnadirCliente;