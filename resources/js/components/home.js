import React, {useState, useEffect} from 'react';
import {
    Route,
    BrowserRouter,
    Switch, Link
}from 'react-router-dom';

//  URL's API
import Accion from '../services/conexion';
import AuthService from '../services/auth/autenticacion';

//  libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import Header from '../components/assets/header';
import ModalReceta from '../components/modales/receta';
import ModalManual from '../components/modales/manual';
import ModalCarrito from '../components/modales/carrito';
import ModalCodigo from '../components/modales/codigo';
import Recipe from '../components/assets/recipe-card';
import RoboshotCard from '../components/assets/roboshot-card';
import Ordenes from '../components/assets/orders';

function Home(props){

    const [roboshots, setRoboshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);
    const [total, setTotal] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [modalReceta, setModalReceta] = useState(false);
    const [modalManual, setModalManual] = useState(false);
    const [modalCarrito, setModalCarrito] = useState(false);
    const [modalCodigo, setModalCodigo] = useState(false);
    const [idReceta, setIDReceta] = useState(0);
    const [idCliente, setIDCliente] = useState(0);
    const [login, setLogin] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    //carga de las recetas al abrir la aplicacion
    useEffect(() =>{

        //  trae los datos almacenados en el localstorage
        const user = AuthService.getCurrentUser();
        console.log(user)
        if(user == null){
            setLogin(false)
        }else{
            setDataUser(user);
            setLogin(true);
        }

        const inicio = async() =>{

            //  trae todos los roboshot registrados
            const result = await Accion.inicio();
            setRoboshots(result.data)
            if(result){
                setLoading(false);
            }
        }
        inicio();
    }, []);

    //  cerrar sesion para clientes
    const logOut = () => {
        AuthService.logout();
        setLogin(false);
        setDataUser('');
        //  toast de carrito vacio
        toast.warning('Sesión cerrada',{
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
    };

    //  abre el modal para ver los detalles de la receta
    function abrirReceta(index, cliente){
        
        setIDReceta(index);
        setIDCliente(cliente);
        setModalReceta(true);
    }

    //  cierra el modal y restablece los valores de receta y cliente
    function cerrarReceta(){
        setIDReceta(0);
        setIDCliente(0);
        setModalReceta(false);
    }

    //  abre el modal para una rceta personalizada
    function abrirManual(cliente){
        setIDCliente(cliente);
        setModalManual(true);
    }

    //  cierra el modal de receta personalizada
    function cerrarManual(){
        setModalManual(false);
    }

    //  abre modal del carrito
    function abrirCarrito(e){
        e.preventDefault();
        setModalCarrito(true);
    }

    //  cierra el modal del carrito
    function cerrarCarrito(){
        setModalCarrito(false);
    }

    //  cierra el modal del carrito
    function cerrarCodigo(){
        setModalCodigo(false);
    }

    //  Añade la receta a la orden
    function cart(response){
        //  incrementa el contador del carrito
        let i = contador;
        setContador(i + 1);

        // genera el arreglo del pedido
        let pedido = {
            prod: i + 1,
            idReceta: response.idReceta,
            idCliente: response.idCliente,
            nombre: response.nombre,
            cliente: response.cliente,
            descripcion: response.descripcion,
            precio: parseInt(response.precio),
            img: response.img,
            ingredientes: response.ingredientes
        };

        const precio = total + parseInt(response.precio);

        //  actualiza el total a pagar y el carrito
        setTotal(precio);
        setCarrito(carrito => [...carrito, pedido]);
        
        //  toast de elemento agregado al carrito
         toast('Elemento agregado al carrito :)',{
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
    }

    //  elimina todo el contenido del carrito
    function vaciarCarrito(){
        setContador(0);
        setTotal(0);
        setCarrito([]);

        //  toast de carrito vacio
        toast.warning('El carrito se ha vaciado :(',{
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
    };

    //  elimina un elemento del carrito
    const eliminaReceta = (id) => {
        let filtro = carrito.filter(item => item.prod == id);
        //  se resta 1 al carrito
        setContador(contador - 1);

        //  se resta el precio del pedido
        const neto = total - parseInt(filtro[0].precio);
        setTotal(neto);

        //  se elimina el pedido del carrito
        setCarrito(carrito.filter(item => item.prod !== id));

        //  toast de carrito vacio
        toast.warning('Se ha eliminado el pedido',{
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
    };

    //  se realiza el pedido y lo guarda en la base de datos
    function pedirCarrito(){

        let data = {
            cliente: idCliente,
            total: total,
            lista: carrito
        };

        //  oculta el modal
        setModalCarrito(false);
        const enviar = Accion.pedido(data);

        enviar.then(resp => {
            console.log(resp)
            //  muestra el modal del codigo
            //setModalCodigo(true);
            //  almacena el codigo generado
            setCodigo(resp.data);
            //  vacia el carrito y pone el contador en 0
            setContador(0);
            setTotal(0);
            setCarrito([]);
        });

    }

    return(
        <>
        <ToastContainer />
        <Header
            carrito = {(e) => abrirCarrito(e)}
            counter = {contador}
            logueado = {login}
            usuario = {dataUser}
            sesion = {(e) => logOut(e)}
        />

        <div className = 'container'>
            
            <Switch>
                <Route exact path = '/'>
                    <RoboshotCard
                        load = {loading}
                        roboshot = {roboshots} 
                    />
                </Route>
                <Route exact path = '/roboshot/:id' >
                    <Recipe
                        abrirReceta = {(e, i) => abrirReceta(e, i)} 
                        abrirManual = {(e) => abrirManual(e)}
                    />
                </Route>
                <Route exact path = '/ordenes'>
                    <Ordenes 
                        logueado = {login}
                        usuario = {dataUser}
                    />
                </Route>
            </Switch>
            
        </div>
            <ModalReceta 
                activo = {modalReceta} 
                inactivo = {(e) => cerrarReceta(e)} 
                idReceta = {idReceta}
                idCliente = {idCliente}
                pedido = {(e) => cart(e)}
            />

            <ModalManual
                activo = {modalManual}
                inactivo = {(e) => cerrarManual(e)} 
                idCliente = {idCliente}
                pedido = {(e) => cart(e)}
            />

            <ModalCarrito
                activo = {modalCarrito}
                inactivo = {(e) => cerrarCarrito(e)}
                total = {total}
                lista = {carrito}
                vaciar = {(e) => vaciarCarrito(e)}
                elimina = {(e) => eliminaReceta(e)}
                pedir = {(e) => pedirCarrito(e)}
            />

            <ModalCodigo 
                activo = {modalCodigo}
                inactivo = {(e) => cerrarCodigo(e)}
                codigo = {codigo}
            />

        </>
    )
    
}

export default Home;