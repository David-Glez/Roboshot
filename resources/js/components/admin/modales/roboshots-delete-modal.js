import React, {useState, useRef} from 'react';

//  URL API
import UserService from '../../../services/auth/servicioUsuarios';

//  Estilos
import { Modal }from 'react-bootstrap';
import atencion from '../../../assets/img/atencion.jpg' 

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

    const id = props.data.id;
    const nombre = props.data.nombre;
    const cliente = props.data.cliente;

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //  captura la contraseña
    const onChangePass = (e) => {
        const pass = e.target.value;
        setPassword(pass);
    }

    //  cerrar toast y redireccionar
    const cerrarToast = () => {
        props.cerrar();
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
            const envio = UserService.eliminarRoboshot(data);
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
        <Form onSubmit = {onSubmitForm} ref = {formRef}>
        <Modal.Body>
            <div className = 'row'>
                <div className = 'col-sm-4'>
                    <img className = 'card-img imagenReceta' src = {atencion} />
                </div>
                <div className = 'col-sm-8'>
                    <div className = 'row'>
                        <h5>
                            Esta por eliminar la siguiente estación:
                        </h5>
                        <ul>
                            <li>ID: {id}</li>
                            <li>Nombre: {nombre}</li>
                            <li>Cliente: {cliente}</li>
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
                        Eliminar estación
                    </button>
                </div>
            </div>
        </Modal.Footer>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </>
    )
}

const RoboshotsDelete = (props) => {

    const ver = props.activo;
    const data = props.data;

    if(ver){
        return(
            <>
            <Modal
                show = {ver}
                onHide = {props.inactivo}
                backdrop = 'static'
                dialogClassName = 'modal-dialog-centered' 
            >
                <Modal.Header>
                    <h5 className='modal-title text-dark'>
                        Eliminar Estación
                    </h5>
                    <button className = 'close' onClick={props.inactivo} >
                        <span aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Contenido
                    cerrar = {props.inactivo}
                    data = {data}
                />
            </Modal>
            </>
        )
    }else{
        return null;
    }

}

export default RoboshotsDelete;