import React, {useState, useEffect} from 'react';

//  libreria de navegacio
import {Redirect} from 'react-router-dom';

//  URL's API
import Accion from '../../services/conexion';

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Loader from '../alertas/loader';
import SinElementos from '../alertas/vacio';

//  card para mostrar los datos del usuario
const DatosUsuario = (props) => {

    const id = props.idUser;
    
    const [dataUsuario, setDataUsuario] = useState([]);
    const [pedidosUsuario, setPedidosUsuario] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inicio = async() => {
            const result = await Accion.datosUsuario(id);

            if(result){
                setLoading(false);
            }
            
            setDataUsuario(result.data.datosUsuario);
            setPedidosUsuario(result.data.pedidos);

        }
        inicio();
    }, []);

    //  abre el modal para datos del usuario
    const abrirModalUsuario = (e) => {
        e.preventDefault();
        props.abrirUsuario();
    }

    //  abre el modal con un pedido
    const abrirModalPedido = (e, item) => {
        e.preventDefault();
        props.abrirPedido(item);
    };

    //  lista los pedidos del usuario
    const listaPedidos = () => {
        return(
            <>
            <div className = 'card'>
                <div className = 'card-header'>
                    <h5 className="card-title">Tus Pedidos</h5>
                </div>
                <div className = 'card-body'>
                    {(pedidosUsuario == '') ? (
                        <>
                        <div className = 'row superior'>
                            <SinElementos />
                        </div>
                        </>
                    ):(
                        <ul className = 'list-group  scrollDiv'>
                            {pedidosUsuario.map((item, index) => {
                                return(
                                    <li className = 'list-group-item' key = {index} >
                                        <a href = '#' onClick = {(e) => abrirModalPedido(e, item)}>
                                            <div className = 'row'>
                                                <div className = 'col-sm-6'>
                                                    {item.codigo}
                                                </div>
                                                <div className = 'col-sm-6'>
                                                    <span className = 'text-success'>
                                                        ${parseFloat(item.total).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            </>
        )
    };

    return(
        <>
        {loading ? (
            <div className = 'col-md-12 superior'>
                <Loader />
            </div>
        ):(
            <>
            <div className = 'col-md-4'>
                <div className = 'cardLogin card-containerLogin'>
                    <img src = {dataUsuario.img} alt="profil-img" className="profile-img-card" />
                    <h5 className="card-title">{dataUsuario.nombres} {dataUsuario.apellidoP} {dataUsuario.apellidoM}</h5>
                    <div className = 'row'>
                        <div className = 'form-group row'>
                            <label htmlFor = 'emailUser' className="col-sm-4 col-form-label">Email</label>
                            <div className = 'col-sm-8'>
                                <span id = 'emailUser' className = 'primaryText form-control-plaintext'>
                                    {dataUsuario.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'form-group row'>
                            <label htmlFor = 'registro' className="col-sm-4 col-form-label">Creado</label>
                            <div className = 'col-sm-8'>
                                <span id = 'registro' className = 'primaryText form-control-plaintext'>
                                    {dataUsuario.alta}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'col-sm-12 d-flex justify-content-center'>
                            <button onClick = {(e) => abrirModalUsuario(e)} className = 'btn btn-success'>
                                Modificar Datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'col-md-8'>
                {listaPedidos()}
            </div>
        </>
        )}
        </>
    )
};

//  principal
const Perfil = (props) => {
    const login = props.logueado;
    const user = props.usuario;


    if(login == false && user == ''){
        return <Redirect to = '/' />
    }else{
        return(
            <>
            <div className = 'row'>
                <DatosUsuario 
                    idUser = {user.id}
                    abrirUsuario = {props.abrirUsuario}
                    abrirPedido = {props.abrirPedido}
                />
            </div>

            
            </>
        )
    }
};

export default Perfil;