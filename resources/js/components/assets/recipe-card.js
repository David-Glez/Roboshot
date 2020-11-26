import React, {useState, useEffect} from 'react';

//  navegacion rutas react
import {useLocation} from 'react-router-dom';

//  URL's API
import Accion from '../../services/conexion';

//  components
import Loader from '../alertas/loader';
import SinElementos from '../alertas/vacio';

const Recipe = (props) => {
    let location = useLocation();
    
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(true);

    //  carga de las recetas al abrir roboshot del cliente
    useEffect(() =>{
        const inicio = async() =>{
            const result = await Accion.recetasCliente(location.state.id);
            setRecetas(result.data);
            if(result){
                setLoading(false);
            }
        }
        inicio();
    }, []);

    //  funcion que muestra las recetas en cards
    const cards = () => {
        if(recetas == ''){
            return(
                <div className = 'col-md-12 superior'>
                    <SinElementos />
                </div>
            );
        }else{
            return recetas.map(data => {
                return(
                    <div className = 'col-sm-3 my-sm-2' key = {data.idReceta}>
                        <div className = 'card mb-4 mb-sm-1'>
                            <img className = 'card-img-top img-fluid' src = {window.location.origin+''+data.img} style = {{maxHeight: 255}} alt = 'Card image cap' />
                            <div className = 'card-body'>
                                <h5 className = 'card-title'>{data.nombre}</h5>
                                <span className = 'price'>${data.precio}</span>
                                <p className = 'card-text text-muted'>{data.descripcion}</p>
                                <div className = 'text-center'>
                                    <button 
                                        className = 'btn pedir'
                                        onClick = {(e) => abrir(data.idReceta, location.state.id, e)}>
                                            Pedir 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) 
            });
        }
    };

    //  funcion para abrir las recetas
    const abrir = (idReceta, idCliente, e) => {
        e.preventDefault();
        props.abrirReceta(idReceta, idCliente)
    };
    
    //  funcionpara abrir modal receta manual
    const manual = (idCliente, e) => {
        e.preventDefault();
        props.abrirManual(idCliente);
    };

    return(
        <>
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
            <button onClick = {(e) => manual(location.state.id, e)} >nueva receta</button>
        </div>
        </>
    )
};

export default Recipe;