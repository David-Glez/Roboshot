import React, {useState, useEffect, useRef} from 'react';

//  estilos
import {Modal} from 'react-bootstrap';

//  URL de la API
import Accion from '../../services/conexion';

//  redireccion
import {Redirect} from 'react-router-dom';

//  libreria toast
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';

//  componentes
import Loader from '../alertas/loader';

const required = (value) =>{
    if(!value){
        
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};

const Contenido = (props) => {

    const id = props.id;

    const form = useRef();
    const image = useRef();
    const checkB = useRef();

    const [loading, setLoading] = useState(false);
    const [cargar, setCargar] = useState(true);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [avatar, setAvatar] = useState(undefined);

    useEffect(() => {

        const inicio = async() =>{
            const result = await Accion.datosUsuario(id);
            if(result){
                setCargar(false);
            }

            setNombres(result.data.datosUsuario.nombres);
            setApellidos(result.data.datosUsuario.apellidoP);
            setEmail(result.data.datosUsuario.email)
            setImg(result.data.datosUsuario.img)
            
        };

        inicio();
    }, []);

    //  carga la imagen al estado 
    const onChangeImg = (e) => {
        
        setAvatar(e.target.files[0])
    
        /*toast.warning('El archivo no es una imagen',{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            draggable: true,
            pauseOnHover: true,
            progress: undefined
        });*/
        
        
    };

    //  captura el nuevo nombre
    const onChangeNombres = (e) => {
        const nombreNuevo = e.target.value;
        setNombres(nombreNuevo);
    };

    //  captura los nuevos apellidos
    const onChangeApellidos = (e) => {
        const apellidosNuevo = e.target.value;
        setApellidos(apellidosNuevo);
    }

    //  captura el correo electronico
    const onChangeEmail = (e) => {
        const emailNuevo = e.target.value;
        setEmail(emailNuevo);
    }

    //  captura la contraseña
    const onChangeContrasena = (e) => {
        const password = e.target.value;
        setContrasena(password);
    }

    //cerrar toast
    const cerrarToast = () =>{
        //props.history.push('/');
        props.cerrar();
        window.location.reload();
    };

    //  envio del formulario
    const onSubmitForm = (e) =>{
        e.preventDefault();

        //  spinner de carga
        setLoading(true);

        //  datos a enviar
        const data = new FormData();
        data.append('nombres', nombres);
        data.append('apellidos', apellidos);
        data.append('email', email);
        data.append('contrasena', contrasena);
        data.append('img', avatar);

        //  validacion del formulario
        form.current.validateAll();
        if(checkB.current.context._errors.length == 0){
            //  envio a la API
            const enviar = Accion.actualizaUsuario(data);
            enviar.then(response => {
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
        }else{
            setLoading(false);
        }
    
    }

    return(
        <Modal.Body>
            {cargar ? (
                <div className = 'row superior'>
                    <Loader />
                </div>
            ):(
                <div className = 'cardLogin card-containerEdit'>
                
                    <h5 className="card-title">
                        Tus Datos
                        <button className = 'close float-right' onClick={props.cerrar}>
                            <span aria-hidden='true'>
                                &times;
                            </span>
                        </button>
                    </h5>

                    <Form onSubmit = {onSubmitForm} ref = {form} encType="multipart/form-data">
                        <div className = 'row'>
                            <div className = 'col-md-6'>
                                <div className = 'row'>
                                    <div className = 'col-sm-6'>
                                        <div className = 'form-group'>
                                            <Input 
                                                type = 'text'
                                                className = 'form-control validaReg'
                                                name = 'nombres'
                                                placeholder="Nombre"
                                                value = {nombres}
                                                onChange = {onChangeNombres}
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
                                                value = {apellidos}
                                                onChange = {onChangeApellidos}
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
                                                value = {contrasena}
                                                validations = {[required]}
                                                onChange = {onChangeContrasena}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'form-group'>
                                            <small>
                                                **Ingresa tu contraseña para hacer validos los cambios
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className = 'col-md-6'>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <img src = {img} alt="profil-img" className="profile-img-card" />
                                    </div>
                                </div>
                                <div className = 'row'>
                                    <div className = 'col-sm-12'>
                                        <div className = 'form-group'>
                                            <Input 
                                                type = 'file'
                                                className = 'form-control'
                                                name = 'img'
                                                placeholder = 'Cambia tu imagen de perfil'
                                                
                                                onChange = {onChangeImg}
                                                ref = {image}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'row'>
                            <div className = 'col-sm-12 d-flex justify-content-center'>
                                <button className = 'btn btn-success' disabled = {loading}>
                                    {loading && (
                                        <span className = "spinner-border spinner-border-sm"></span>
                                    )}
                                    Actualizar
                                </button>
                            </div>
                        </div>
                        <CheckButton style={{ display: "none" }} ref = {checkB} />
                    </Form>
                </div>
            )}
        </Modal.Body>
    )

};

const ModalUsuario = (props) => {
    const ver = props.activo;
    const quitar = props.inactivo;
    const id = props.id;
    const token = props.token;

    if(ver){
        return(
            <>
            
            <Modal
                show = {ver}
                onHide = {props.inactivo}
                size = 'lg'
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered'
                className = 'modalTransparente'
            >
                
                <Contenido
                    cerrar = {props.inactivo}
                    id = {id} 
                />
            </Modal>
            </>
        )
    }else{
        return null;
    }
}

export default ModalUsuario;