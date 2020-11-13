import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

//  URL's API
import Accion from '../services/conexion';

//  Logo roboshot
import logo from '../img/roboshot-logo-1.png';

//  iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

//libreria toast
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  componentes
import ModalReceta from '../components/modales/receta';
import ModalManual from '../components/modales/manual';
import ModalCarrito from '../components/modales/carrito';
import ModalCodigo from '../components/modales/codigo';
import Loader from '../components/alertas/loader';
import SinElementos from '../components/alertas/vacio';


function Home(props){

    const [recetas, setReceta] = useState([]);
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

    //carga de las recetas al abrir la aplicacion
    useEffect(() =>{
        const inicio = async() =>{
            const result = await Accion.inicio();
            setReceta(result.data)
            if(result){
                setLoading(false);
            }
        }
        inicio();
    }, []);


    //  funcion para mostrar las recetas en cards
    function cards(){
        if(recetas == ''){
            return (
                <div className = 'col-md-12 superior'>
                    <SinElementos />
                </div>
                
            )
        }else{
            return recetas.map(x => {
                return x.map(data => {
                    return(
                        <div className = 'col-sm-3 my-sm-2' key = {data.idReceta}>
                            <div className = 'card mb-4 mb-sm-1'>
                                <img className = 'card-img-top img-fluid' src = {window.location.origin+''+data.img} style = {{maxHeight: 255}} alt = 'Card image cap' />
                                <div className = 'card-body'>
                                    <h5 className = 'card-title'>{data.nombre}</h5>
                                    <span className = 'price'>${data.precio}</span>
                                    <p className = 'card-text text-muted'>Encuentralo con {data.cliente}</p>
                                    <p className = 'card-text text-muted'>{data.descripcion}</p>
                                    <div className = 'text-center'>
                                        <button 
                                            className = 'btn pedir'
                                            onClick = {(e) => abrirReceta(data.idReceta, data.idCliente, e)}>
                                                Pedir 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) 
                })
            })
        }
    }

    //  abre el modal para ver los detalles de la receta
    function abrirReceta(index, cliente, e){
        e.preventDefault();
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
    function abrirManual(e){
        e.preventDefault();
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
            total: total,
            lista: carrito
        };

        //  oculta el modal
        setModalCarrito(false);
        const enviar = Accion.pedido(data);

        enviar.then(resp => {
            //  muestra el modal del codigo
            setModalCodigo(true);
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
        <nav className = 'navbar nabvar-expanded-md navbar-dark bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <a className = 'navbar-brand'>
                        <img className = 'logo' src = {logo}  alt = '' />
                    </a>
                </div>
                
                <div className = 'col-md-4'>
                    <button type="button" className="btn btn-outline-warning" onClick = {(e) => abrirCarrito(e)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <span className="badge badge-light" id="NumCarrito">{contador}</span>
                    </button>
                    <Link to={"/login"} className="btn btn-primary btn-radius float-right">Iniciar Sesión</Link>
                </div>
            </div>
        </nav>

        <div className = 'container'>
            {loading ? (
                <div className = 'row superior'>
                    <Loader />
                </div>
            ):(
                <div className = 'row'>
                    {cards()}
                </div>
            )}
            
            
            <div className="new-recipe">
                <button onClick = {(e) => abrirManual(e)} >nueva receta</button>
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
            
        </div>

        </>
    )
    
}

export default Home;