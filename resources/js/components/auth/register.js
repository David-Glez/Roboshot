import React, {useState, useRef} from 'react';

//  imagenes
import logo from '../../img/roboshot-logo-1.png'

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

//  api para control de login y registro
import AuthService from '../../services/auth/autenticacion';

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const required = (value) =>{
    if(!value){
        
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};


const Register = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    //  variables a enviar
    const [nombres, setNombres] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [loading, setLoading] = useState(false);

    //  funcion que guarda el nombre
    const onChangeNombre = (e) => {
        const username = e.target.value;
        setNombres(username);
    };

    //  funcion que guarda el apellido
    const onChangeApellido = (e) => {
        const lastName = e.target.value;
        setApellido(lastName);
    };

    //  funcion que guarda el correo
    const onChangeEmail = (e) => {
        const correo = e.target.value;
        setEmail(correo);
    };

    //  funcion que guarda el usuario
    const onChangeUsuario = (e) => {
        const user = e.target.value;
        setUsuario(user);
    };

    //  funcion que guarda la contraseña
    const onChangeContrasena = (e) => {
        const password = e.target.value;
        setContrasena(password);
    };

    //cerrar toast
    const cerrarToast = () =>{
        props.history.push('/');
    };

    //  funcion que envia los datos a insertar en la bd
    const onSubmitForm = (e) => {
        //  previe la recarga de la pagina
        e.preventDefault();

        setLoading(true);

        let data = {
            nombres: nombres,
            apellido: apellido,
            correo: email,
            usuario: usuario,
            contrasena: contrasena
        };

        //  validacion del formulario
        form.current.validateAll();

        if(checkBtn.current.context._errors.length == 0){
            //  envio de los datos al backend
            const envio = AuthService.registrar(data);
            
            //  respuesta del backend
            envio.then((response) => {
                
                if(response.data.status){
                    toast.success(response.data.mensaje,{
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
                    toast.warning(response.data.mensaje,{
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

                    setLoading(false);
                }

            })
            
        }else{
            setLoading(false);
        }
        
    };

    return(
        <>
        <ToastContainer />
        <nav className = 'navbar nabvar-expanded-md navbar-dark bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <a className = 'navbar-brand'>
                        <img className = 'logo' src = {logo}  alt = '' />
                    </a>
                </div>
                
            </div>
        </nav>
        <div className = 'container '>
            <div className = 'row'>
                <div className = 'col-md-6'>
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
                                            name = 'userName'
                                            placeholder="Nombre"
                                            value = {nombres}
                                            onChange = {onChangeNombre}
                                            validations = {[required]}
                                        />
                                    </div>
                                </div>
                                <div className = 'col-sm-6'>
                                    <div className = 'form-group'>
                                        <Input 
                                            type = 'text'
                                            className = 'form-control validaReg'
                                            name = 'lastName'
                                            placeholder="Apellido"
                                            value = {apellido}
                                            onChange = {onChangeApellido}
                                            validations = {[required]}
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
                                            value = {email}
                                            onChange = {onChangeEmail}
                                            validations = {[required]} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className = 'row'>
                                <div className = 'col-sm-12'>
                                    <div className = 'form-group'>
                                        <Input
                                            type = 'text'
                                            className = 'form-control validaReg'
                                            name = 'user'
                                            placeholder = 'Usuario' 
                                            value = {usuario}
                                            onChange = {onChangeUsuario}
                                            validations = {[required]}
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
                                            name = 'password'
                                            placeholder = 'Contraseña'
                                            value = {contrasena}
                                            onChange = {onChangeContrasena}
                                            validations = {[required]} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className = 'row'>
                                <div className = 'col-sm-12 d-flex justify-content-center'>
                                    <button className = 'btn btn-success' disabled = {loading}>
                                        {loading && (
                                            <span className = "spinner-border spinner-border-sm"></span>
                                        )}
                                        Registrarte
                                    </button>
                                </div>
                            </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
                <div className = 'col-md-6'>
                    Aqui van los beneficios 
                </div>
            </div>
        </div>
        </>
    )
};

export default Register;