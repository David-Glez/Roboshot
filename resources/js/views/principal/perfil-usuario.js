import React, {useState, useEffect} from 'react';

//  libreria de navegacio
import {Redirect} from 'react-router-dom';

//  URL's API
import Accion from '../../services/conexion';

//  componentes
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardDataUser from '../../components/principal/cards/card-data-usuario';
import CardPedidos from '../../components/principal/cards/pedidos-card';

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
    const abrirModalPedido = ( item) => {
        props.abrirPedido(item);
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
                <CardPedidos
                    pedidos = {pedidosUsuario}
                    abrirPedido = {(e) => abrirModalPedido(e)} 
                />
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