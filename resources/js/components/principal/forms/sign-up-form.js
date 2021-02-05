import React, {useState, useRef, useEffect} from 'react';

//  elementos y validacion de formulario
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Select from 'react-validation/build/select';

//  toast
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  API
import AuthService from '../../../services/auth/autenticacion';

const required = (value) =>{
    if(!value){
        return(
            <small className = 'text-danger' role = 'alert'>
                Este campo es requerido
            </small>
        )
    }
};

const SignUpForm = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    //  variables a enviar
    const [nombres, setNombres] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [diaN, setDiaN] = useState(0);
    const [mesN, setMesN] = useState(0);
    const [yearN, setYearN] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [dias, setDias] = useState([]);
    const [meses, setMeses] = useState([
        {m:1, n:'ene'},
        {m:2, n:'feb'},
        {m:3, n:'mar'},
        {m:4, n:'abr'},
        {m:5, n:'may'},
        {m:6, n:'jun'},
        {m:7, n:'jul'},
        {m:8, n:'ago'},
        {m:9, n:'sep'},
        {m:10, n:'oct'},
        {m:11, n:'nov'},
        {m:12, n:'dic'},
    ]);
    const [year, setYear] = useState([]);

    useEffect(() => {

        //  arreglo con los años hasta 1950
        let actualYear = (new Date()).getFullYear();
        let allYears = [];
        for(let x = 0; x <= 70; x++) {
            allYears.push(actualYear - x)
        }
        setYear(allYears);

        //  arreglo con los dias
        let allDays = [];
        for(let i = 1; i<32; i++){
            allDays.push(i);
        }
        setDias(allDays);

    },[]);

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

    //  funcion que guarda el dia selecionado
    const onChangeDia = (e) => {
        const day = e.target.value;
        setDiaN(day);
    };

    //  funcion que guarda el mes seleccionado
    const onChangeMes = (e) => {
        const month = e.target.value;
        setMesN(month);
    }

    //  funcion que guarda el año escrito
    const onChangeYear = (e) => {
        const year = e.target.value;
        setYearN(year);
    };

    //  dias para el select
    const diasSelect = () => {
        return dias.map((number) => {
            return(
                <option key = {number} value = {number}>
                    {number}
                </option>
            )
        })
    };

    //  meses para el select
    const mesesSelect = () => {
        return meses.map((item, index) => {
            return(
                <option key = {index} value = {item.m}>
                    {item.n}
                </option>
            )
        })
    };

    //  años para el select
    const yearSelect = () => {
        return year.map((number) => {
            return(
                <option key = {number} value = {number}>
                    {number}
                </option>
            )
        })
    }

    //  cerrar toast
    const cerrarToast = () =>{
        props.history.push('/');
    };

    //  funcion que envia los datos a insertar en la bd
    const onSubmitForm = (e) => {
        //  previe la recarga de la pagina
        e.preventDefault();

        setLoading(true);
        let fechaNacimiento = new Date(yearN, mesN-1, diaN);
        
        let data = {
            nombres: nombres,
            apellido: apellido,
            correo: email,
            usuario: usuario,
            contrasena: contrasena,
            fechaNacimiento: fechaNacimiento
        };

        //  validacion del formulario
        form.current.validateAll();

        if(checkBtn.current.context._errors.length == 0){
            const envio = AuthService.registrar(data);
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
                    setLoading(false)
                }
            })
        }else{
            setLoading(false);
        }
        
    };

    return(
        <>
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
                                disabled = {loading}
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
                                disabled = {loading}
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
                                disabled = {loading} 
                            />
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-12'>
                        <div className = 'form-group'>
                            <small>Fecha de Nacimiento</small>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-sm-3'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control'
                                name = 'dia'
                                validations = {[required]} 
                                onChange = {onChangeDia}
                                disabled = {loading}
                            >
                                <option value = ''>Día</option>
                                {diasSelect()}
                            </Select>
                        </div>
                    </div>
                    <div className = 'col-sm-6'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control'
                                name = 'mes'
                                validations = {[required]} 
                                onChange = {onChangeMes}
                                disabled = {loading}
                            >
                                <option value = ''>Mes</option>
                                {mesesSelect()}
                            </Select>
                        </div>
                    </div>
                    <div className = 'col-sm-3'>
                        <div className = 'form-group'>
                            <Select
                                className = 'form-control '
                                name = 'yearN'
                                onChange = {onChangeYear}
                                validations = {[required]}
                                disabled = {loading}
                            >
                                <option value = ''>Año</option>
                                {yearSelect()}
                            </Select>
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
                                disabled = {loading}
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
                                disabled = {loading} 
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
        </>
    )

}

export default SignUpForm;