import React, {useState, useRef} from 'react';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

//  libreria toast
import { toast } from 'react-toastify';
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

const RoboshotsAdd = (props) => {

    const [loading, setLoading] = useState(false);
    const [mac, setMac] = useState('');

    const onChangeMac = (e) => {
        const dir = e.target.value;
        setMac(dir)
    }
    return(
        <>
        <div className = 'card'>
            <Form encType="multipart/form-data" >
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Registrar Estación
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
                    <div className = 'col-md-8'>
                        <div className = 'form-group row'>
                            <label htmlFor = 'cliente' className = 'col-sm-4'>
                                Cliente
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'cliente'
                                    name = 'cliente'
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'mac' className = 'col-sm-4'>
                                Dirección Física
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    className = 'form-control'
                                    value = {mac}
                                    onChange = {onChangeMac}
                                    disabled = {loading}
                                    
                                />
                            </div>
                        </div>
                        <div className = 'form-group row'>
                            <label htmlFor = 'nombre' className = 'col-sm-4'>
                                Nombre para la estación
                            </label>
                            <div className = 'col-sm-8'>
                                <Input
                                    type = 'text'
                                    className = 'form-control'
                                    id = 'nombre'
                                    name = 'nombre'
                                    disabled = {loading}
                                    validations = {[required]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className = 'col-md-4'>
                        <div className = 'row'>
                            aqui puede ir un logo
                        </div>
                    </div>
                </div>
            </div>
            <CheckButton style={{ display: "none" }}  />
            </Form>
        </div>
        </>
    )
}

export default RoboshotsAdd;