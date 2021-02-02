import React, {useState, useRef} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

//  toast
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  API
import AuthService from '../../../services/auth/autenticacion';

//  estilos 
import user from '../../../assets/img/user.png';

const required = (value) =>{
    if(!value){
        return(
            <div className = 'alert alert-danger' role="alert">
                Este campo es requerido
            </div>
        )
    }
};

const SignInForm = (props) => {
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
            envio.then((response) => {
                if(response.autorizado){
                    switch(response.idRol){
                        case 1:
                            props.history.push('/admin');
                        break;
                        case 2:
                            //console.log('En construccion');
                            props.history.push('/admin');
                        break;
                        case 4:
                            props.history.push('/');
                        break;
                    }
                }else{
                    let error = 'Usuario y/o contraseña incorrectos';
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
                    setLoading(false)
                }
            })  
        }else{
            setLoading(false);
        }
    };

    return(
        <>
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

                <CheckButton style={{ display: "none" }} ref={checkBtn}/>
            </Form>
        </div>
        </>
    )
}

export default SignInForm;