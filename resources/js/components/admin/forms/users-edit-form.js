import React, {useState, useEffect, useRef} from 'react';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

//  Estilos
import {Spinner}from 'react-bootstrap';

const required = (value) =>{
    if(!value){
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};

const UsersUpdate = (props) => {
    const formUp = useRef();
    const checkBtn = useRef();
    const image = useRef();

    const idUser = props.location.idUsuario;

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPat] = useState('');
    const [apellidoMaterno, setApellidoMat] = useState('');
    const [rfc, setRFC] = useState('');
    const [razon, setRazon] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [resetPass, setResetPass] = useState(false);
    const [esquema, setEsquema] = useState('');
    const [loading, setLoading] = useState(false);
    const [charge, setCharge] = useState(true);
    const [img, setImg] = useState(null);
    const [logo, setLogo] = useState();

    useEffect(() => {
        const inicio = async() =>{
            const result = await UserService.infoCliente(idUser);
            if(result){
                setCharge(false);
                setUsuario(result.data.usuario);
                setNombre(result.data.nombre);
                setApellidoPat(result.data.apellidoPaterno);
                setApellidoMat(result.data.apellidoMaterno);
                setRFC(result.data.RFC);
                setEmail(result.data.email);
                setRazon(result.data.razonSocial);
                setEsquema(result.data.esquema);
                setLogo(result.data.logo);
            }
        }
        inicio()
    }, []);

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

    //  captura contraseña
    const onChangePass = (e) => {
        const pass = e.target.value;
        setResetPass(!pass);
    }

    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        props.history.push('/admin/usuarios');
    }

    //  envio del formulario
    const onSubmitForm = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('id', idUser);
        data.append('nombre', nombre);
        data.append('apellidoPaterno', apellidoPaterno);
        data.append('apellidoMaterno', apellidoMaterno);
        data.append('rfc', rfc);
        data.append('email', email);
        data.append('razonSocial', razon);
        data.append('resetPass', resetPass);
        data.append('new_img', img);
        data.append('old_img', logo);

        //  validacion del formulario
        formUp.current.validateAll();

        if(checkBtn.current.context._errors.length == 0){

            const envio = UserService.editarCliente(data);
            envio.then(response => {
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
                    let mensajes = response.data.mensaje;
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
                    setLoading(false);
                }
            })

        }else{
            setLoading(false);
        }
    }

    return(
        <>
        <div className = 'card'>
            <Form onSubmit = {onSubmitForm} encType="multipart/form-data" ref = {formUp}>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Editar Usuario
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
                {charge ? (
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
                                    disabled = {loading}
                                    onChange = {onChangeNombre}
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
                                    disabled = {loading}
                                    onChange = {onChangeApellidoP}
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
                                    disabled = {loading}
                                    onChange = {onChangeApellidoM}
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
                                    disabled = {loading}
                                    onChange = {onChangeRazon}
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
                                    disabled = {loading}
                                    onChange = {onChangeRFC}
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
                                    disabled = {loading}
                                    onChange = {onChangeEmail}
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
                                    disabled 
                                />
                                <small>Este espacio no es editable</small>
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-6'>
                        <div className = 'row'>
                            <div className = 'col-sm-12 imgPadre'>
                                <div className = 'imageContent content-justify-center'>
                                    <img src={img ? URL.createObjectURL(img) : logo } alt={img ? img.name : null} />
                                </div>
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'img' className = 'col-sm-4'>
                                Logo
                            </label>
                            <div className = 'col-sm-8'>
                                <div className = 'custom-file'>
                                    <input type = 'file' id = 'img' className = 'custom-file-input' onChange = {onChangeFile} lang="es" />
                                    <label className="custom-file-label" htmlFor="img">Seleccionar...</label>
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
                                    disabled 
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'resetPass' className = 'form-check-label col-sm-6'>
                                    Reiniciar Contraseña
                            </label>
                            <div className = 'form-check col-sm-6'>
                                <Input
                                    type = 'checkbox'
                                    className = 'form-check-input position-static'
                                    id = 'resetPass'
                                    name = 'resetPass'
                                    value = {resetPass}
                                    disabled = {loading}
                                    onChange = {onChangePass}
                                />
                                
                            </div>
                            <small>
                                La contraseña predeterminada es rob0sh0t-1nt3gr@
                            </small>
                        </div>
                    </div>
                    </div>
                    </>
                )}
            </div>
            <CheckButton style={{ display: "none" }} ref = {checkBtn}/>
            </Form>
        </div>
        </>
    )
}

export default UsersUpdate;