import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Accion from '../services/conexion';

import logo from '../img/roboshot-logo-1.png';
//import ModalReceta from './modales/pedirReceta';
//import ModalManual from  './modales/pedirManual';

function Home(props){

    const [recetas, setReceta] = useState([]);
    const [modalReceta, setModalReceta] = useState(false);
    const [modalManual, setModalManual] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const [idReceta, setIdReceta] = useState(0);

    //carga de las recetas al abrir la aplicacion
    /*useEffect(() =>{
        const inicio = async() =>{
            const result = await Accion.inicio();
            setReceta(result.data.recetas)
        }
        inicio();
    }, []);*/

    //funcion para mostrar las recetas en cards
    /*function recetas(){
        return recetas.map(data =>{
            return(
                <div className = 'col-sm-3 my-sm-2' key = {data.idReceta}>
                    <div className = 'card mb-4 mb-sm-1'>
                        <img className = 'card-img-top img-fluid' src = {window.location.origin+'/'+data.img} style = {{maxHeight: 255}} alt = 'Card image cap' />
                        <div className = 'card-body'>
                            <h5 className = 'card-title'>{data.nombre}</h5>
                            <span className = 'price'>${parseFloat(data.precio).toFixed(2)}</span>
                            <p className = 'card-text text-muted'>{data.descripcion}</p>
                            <div className = 'text-center'>
                                <button 
                                    className = 'btn pedir'
                                    onClick = {(e) => abrirReceta(data.idReceta, e)}>
                                        Pedir 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }*/

    function abrirReceta(index, e){
        e.preventDefault();
        setIdReceta(index);
        setModalReceta(true);
    }

    function cerrarReceta(){
        setIdReceta(0);
        setModalReceta(false);
    }

    function recetaManual(e){
        e.preventDefault();
        setModalManual(true);
    }

    function cerrarRecetaManual(){
        setModalManual(false);
    }

    function login(e){
        e.preventDefault();
        setModalLogin(true);
    }

    function cerrarLogin(){
        setModalLogin(false);
    }

    return(
        <>
        <nav className = 'navbar nabvar-expanded-md navbar-dark bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <a className = 'navbar-brand'>
                        <img className = 'logo' src = {logo}  alt = '' />
                    </a>
                </div>
                <div className = 'col-md-4'>
                    <Link to={"/login"} className="btn btn-primary btn-radius float-right">Iniciar Sesión</Link>
                </div>
            </div>
        </nav>

        <div className = 'container'>

            <div className = 'row'>
                
            </div>
            
            <div className="new-recipe">
                <button onClick = {(e) => recetaManual(e)} >nueva receta</button>
            </div>
            
        </div>

        </>
    )
    /*return(
        <>
        <nav className = 'navbar nabvar-expanded-md navbar-dark bg-light'>
            <div className = 'container'>
                <div className = 'col-md-8'>
                    <a className = 'navbar-brand'>
                        <img className = 'logo' src = {logo}  alt = '' />
                    </a>
                </div>
                <div className = 'col-md-4'>
                    <button onClick={(e) => login(e)} className = 'btn btn-primary btn-radius float-right'>
                        Inicio Sesión
                    </button>
                </div>
            </div>
        </nav>

        <div className = 'container'>

            <div className = 'row'>
                {recetas()}
            </div>
            <ModalReceta 
                activo = {modalReceta} 
                inactivo = {(e) => cerrarReceta(e)} 
                idReceta = {idReceta}
            />
            <div className="new-recipe">
                <button onClick = {(e) => recetaManual(e)} >nueva receta</button>
            </div>
            <ModalManual
                activo = {modalManual} 
                inactivo = {(e) => cerrarRecetaManual(e)}
            />
            <ModalLogin
                activo = {modalLogin}
                inactivo = {(e) => cerrarLogin(e)}
             />
        </div>

        </>
    )*/
}

export default Home;