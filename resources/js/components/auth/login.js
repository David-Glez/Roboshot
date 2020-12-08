import React, {useState, useRef} from 'react';

//  imagenes
import user from '../../img/user.png';
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
            <div className = 'alert alert-danger' role="alert">
                Este campo es requerido
            </div>
        )
    }
};

const Login = (props) =>{

    const form = useRef();
    const checkBtn = useRef();
    
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeUsuario = (e) =>{
        const username = e.target.value;
        setUsuario(username);
    };

    const onChangeContrasena = (e) =>{
        const password = e.target.value;
        setContrasena(password);
    };

    const onSubmitForm = (e) =>{
        //evita que la pagina se recargue
        e.preventDefault();
        
        setLoading(true);

        let credenciales = {
            nombre: usuario,
            password: contrasena
        };

        //validacion de los campos del formulario
        form.current.validateAll();
        if(checkBtn.current.context._errors.length == 0){
            
            const envio = AuthService.login(credenciales);

            envio.then((response) =>{
                
                if(response.autorizado){
                    if(response.idRol == 4){
                        props.history.push('/');
                    }else{
                        props.history.push('/admin');
                        //window.location.reload();
                    }
                    
                }else{
                    let error = 'Usuario y/o contraseña incorrectos';
                    setLoading(false);
                    toast.warning(error,{
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
            });    
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
        <div className = 'container mt-3'>
            <div className = 'row'>
                <div className = "col-md-4">
                    <div className = "cardLogin card-containerLogin">
                        <img src = {user} alt="profil-img" className="profile-img-card" />
                        <Form onSubmit = {onSubmitForm} ref = {form}>
                            <div className = 'form-group'>
                                <label htmlFor = "userName">Usuario</label>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    name = 'userName'
                                    value = {usuario}
                                    onChange = {onChangeUsuario}
                                    validations = {[required]}
                                />
                            </div>
                            <div className = 'form-group'>
                                <label htmlFor = 'contrasena'>Contraseña</label>
                                <Input
                                    type = 'password'
                                    className = 'form-control'
                                    name = 'contrasena'
                                    value = {contrasena}
                                    onChange = {onChangeContrasena}
                                    validation = {[required]}
                                />
                            </div>
                            <div className = 'form-group'>
                                <button className = 'btn btn-primary' disabled = {loading}>
                                    {loading && (
                                        <span className = "spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Iniciar Sesión</span>
                                </button>
                            </div>

                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
                <div className = 'col-md-8'>
                    Aqui va una descripcion de roboshot
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;