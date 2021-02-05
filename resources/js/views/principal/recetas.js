import React, {useState, useEffect} from 'react';

//  URL's API
import Accion from '../../services/conexion';

//  components
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardRecipe from '../../components/principal/cards/recipe-card';

const Recipe = (props) => {
    const idCliente = props.location.idCliente;
    
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(true);

    //  carga de las recetas al abrir roboshot del cliente
    useEffect(() =>{
        const inicio = async() =>{
            const result = await Accion.recetasCliente(idCliente);
            setRecetas(result.data);
            if(result){
                setLoading(false);
            }
        }
        inicio();
    }, []);

    //  funcion para abrir las recetas
    const abrir = (idReceta, idCliente) => {
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
                {(recetas == '') ? (
                    <>
                    <div className = 'col-md-12 superior'>
                        <SinElementos />
                    </div>
                    </>
                ):(
                    <>
                    {recetas.map((x) =>
                        <CardRecipe
                            key = {x.id}
                            datos = {x}
                            cliente = {idCliente}
                            abrirReceta = {(e,i) => abrir(e,i)} 
                        /> 
                    )}
                    </>
                )}
            </div>
        )}

        <div className="new-recipe">
            <button onClick = {(e) => manual(idCliente, e)} >nueva receta</button>
        </div>
        </>
    )
};

export default Recipe;