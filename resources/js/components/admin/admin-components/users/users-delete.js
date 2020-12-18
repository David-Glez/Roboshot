import React, {useState, useRef} from 'react';

//  URL API
import UserService from '../../../../services/auth/servicioUsuarios';

//  Estilos
import { Modal }from 'react-bootstrap';
import atencion from '../../../../img/atencion.jpg' 

//  libreria toast
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

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

    const formRef = useRef();
    const checkBtn = useRef();

    const id = props.id;
    const nombre = props.nombre;
    const razon = props.razon;

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //  captura la contraseña
    const onChangePass = (e) => {
        const pass = e.target.value;
        setPassword(pass);
    }

    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        props.history.push('/admin/usuarios');
    }

    //  envio del formulario
    const onSubmitForm = (e) => {
        e.preventDefault();
        setLoading(true)

        let data = {
            id: id,
            password: password
        }

         //  validacion del formulario
        formRef.current.validateAll();

        if(checkBtn.current.context._errors.length == 0){
            const envio = UserService.eliminarCliente(data);
            envio.then(response => {
                setLoading(false);
                console.log(response.data)
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
                        //onClose: () => cerrarToast()
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
    }

    return(
        <>
        <Form onSubmit = {onSubmitForm} ref = {formRef}>
        <Modal.Body>
            <div className = 'row'>
                <div className = 'col-sm-4'>
                    <img className = 'card-img imagenReceta' src = {atencion} />
                </div>
                <div className = 'col-sm-8'>
                    <div className = 'row'>
                        <h5>
                            Esta por Eliminar el siguiente usuario:
                        </h5>
                        <ul>
                            <li>ID: {id}</li>
                            <li>Nombre: {nombre}</li>
                            <li>Razón Social: {razon}</li>
                        </ul>
                        <p>
                            Esta acción no se puede deshacer.<br></br>
                            Si desea eliminar el registro ingrese su contraseña.
                        </p>
                    </div>
                    <div className = 'row'>
                        <div className = 'col-sm-12'>
                            <Input
                                type = 'password'
                                className = 'form-control'
                                id = 'contrasena'
                                name = 'contrasena'
                                placeholder = 'Contraseña'
                                value = {password}
                                onChange = {onChangePass}
                                disabled = {loading}
                                validations = {[required]}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className = 'row'>
                <div className = 'col-sm-12 d-flex justify-content-center'>
                    <button className = 'btn btn-danger' disabled = {loading}>
                        {loading && (
                            <span className = "spinner-border spinner-border-sm"></span>
                        )}
                        Eliminar usuario
                    </button>
                </div>
            </div>
        </Modal.Footer>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </>
    )
}

const UsersDelete = (props) => {

    const ver = props.activo;
    const id = props.id;
    const nombre = props.nombre;
    const razon = props.razon;

    if(ver){
        return(
            <>
            <Modal
                show = {props.activo}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Eliminar Usuario
                    </h5>
                    <button className = 'close' onClick={props.inactivo}>
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Contenido
                    cerrar = {props.inactivo}
                    id = {id}
                    nombre = {nombre}
                    razon = {razon}
                />
            </Modal>
            </>
        )
    }else{
        return null;
    }
};

export default UsersDelete;