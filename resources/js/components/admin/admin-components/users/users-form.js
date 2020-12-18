import React, {useState, useRef} from 'react';

//  API url
import UserService from '../../../../services/auth/servicioUsuarios';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import PasswordStrengthBar from 'react-password-strength-bar'

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  Estilos
import {Spinner}from 'react-bootstrap';
import camera from '../../../../img/camera.jpg';

const required = (value) =>{
    if(!value){
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};

const UsersAdd = (props) => {
    const imgRef = useRef();
    const checkBtn = useRef();
    const formRef = useRef();

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPat] = useState('');
    const [apellidoMaterno, setApellidoMat] = useState('');
    const [rfc, setRFC] = useState('');
    const [razon, setRazon] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [esquema, setEsquema] = useState('');
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);

    //  captura la imagen
    const onChangeFile = (e) => {
        setImg(e.target.files[0]);
    }

    //  captura nombre
    const onChangeNombre = (e) => {
        const name = e.target.value;
        setNombre(name);
    }

    //  captura apellido paterno
    const onChangeApellidoP = (e) => {
        const lastName = e.target.value;
        setApellidoPat(lastName); 
    }

    //  captura apellido Materno
    const onChangeApellidoM = (e) => {
        const lastName = e.target.value;
        setApellidoMat(lastName);
    }

    //  captura email
    const onChangeEmail = (e) => {
        const correo = e.target.value;
        setEmail(correo);
    }

    //  captura rfc
    const onChangeRFC = (e) => {
        const reg = e.target.value;
        setRFC(reg);
    }

    //  captura razon social
    const onChangeRazon = (e) => {
        const razonSocial = e.target.value;
        setRazon(razonSocial);
    }

    //  captura nombre de la bd
    const onChangeBD = (e) => {
        const bd = e.target.value;
        setEsquema(bd);
    }

    //  captura nombre de usuario
    const OnChangeUser = (e) => {
        const user = e.target.value;
        setUsuario(user);
    }

    //  captura contraseña
    const onChangePass = (e) => {
        const pass = e.target.value;
        setContrasena(pass);
    }

    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        props.history.push('/admin/usuarios');
    }

    //  envio del formulario
    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('nombre', nombre);
        data.append('apellidoPaterno', apellidoPaterno);
        data.append('apellidoMaterno', apellidoMaterno);
        data.append('rfc', rfc);
        data.append('email', email);
        data.append('razonSocial', razon);
        data.append('bd', esquema);
        data.append('user', usuario);
        data.append('password', contrasena);
        data.append('img', img);

        //  validacion del formulario
        formRef.current.validateAll();

        if(checkBtn.current.context._errors.length == 0){
            const envio = UserService.nuevoCliente(data);
            envio.then(response => {
                setLoading(false);
                console.log(response.data);
                if(response.data.status == true){
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
            .catch(function (error) {
                setLoading(false);
                toast.warning(error.response.mensaje,{
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
        }else{
            setLoading(false);
        }
    };

    return(
        <>
        
        <div className = 'card'>
            <Form onSubmit = {submitForm} encType="multipart/form-data" ref = {formRef}>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Añadir Usuario
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
                                    value = {nombre}
                                    onChange = {onChangeNombre}
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'apellidoP' className = 'col-sm-4'>
                                Apellido Paterno
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'apellidoP'
                                    name = 'apellidoP'
                                    value = {apellidoPaterno}
                                    onChange = {onChangeApellidoP}
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'apellidoM' className = 'col-sm-4'>
                                Apellido Materno
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'apellidoM'
                                    name = 'apellidoM'
                                    value = {apellidoMaterno}
                                    onChange = {onChangeApellidoM}
                                    disabled = {loading}
                                    validations = {[required]}
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
                                    value = {razon}
                                    onChange = {onChangeRazon}
                                    disabled = {loading}
                                    validations = {[required]}
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
                                    value = {rfc}
                                    onChange = {onChangeRFC}
                                    disabled = {loading}
                                    validations = {[required]}
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
                                    value = {email}
                                    onChange = {onChangeEmail}
                                    disabled = {loading}
                                    validations = {[required]}
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
                                    value = {esquema}
                                    onChange = {onChangeBD}
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                                <small>Evite espacios y máyusculas</small>
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-sm-12 imgPadre'>
                                <div className = 'imageContent content-justify-center'>
                                    <img src={img ? URL.createObjectURL(img) : camera } alt={img ? img.name : null}/>
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'img' className = 'col-sm-4'>
                                Logo
                            </label>
                            <div className = 'col-sm-8'>
                                <div className = 'custom-file'>
                                    <input type = 'file' id = 'img' className = 'custom-file-input' ref = {imgRef} onChange = {onChangeFile}/>
                                    <label className="custom-file-label" htmlFor="img">Choose file...</label>
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
                                    value = {usuario}
                                     onChange = {OnChangeUser}
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'contrasena' className = 'col-sm-4'>
                                Contraseña
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'password'
                                    className = 'form-control'
                                    id = 'contrasena'
                                    name = 'contrasena'
                                    value = {contrasena}
                                    onChange = {onChangePass}
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                                <PasswordStrengthBar 
                                    password = {contrasena} 
                                    scoreWords = {['débil', 'débil', 'bien', 'fuerte', 'muy fuerte']}
                                    shortScoreWord = 'muy corta'
                                />
                                <small>
                                    Asegúrese de guardar su contraseña
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
        </>
    )
};

export default UsersAdd;