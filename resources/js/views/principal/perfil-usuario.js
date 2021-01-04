import React, {useState, useEffect} from 'react';

//  libreria de navegacio
import {Redirect} from 'react-router-dom';

//  URL's API
import Accion from '../../services/conexion';

//  componentes
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardDataUser from '../../components/principal/cards/card-data-usuario';

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
    const abrirModalUsuario = () => {
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
                <CardDataUser
                    dataUsuario = {dataUsuario}
                    abrirModal = {(e) => abrirModalUsuario(e)}
                />
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