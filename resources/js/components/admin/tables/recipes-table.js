import React, {useState, useEffect} from 'react';

//  Estilos
import {Spinner} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  componentes
//import RoboshotsAddButton from '../../admin/buttons/roboshots-add-button';

//  variables
import opciones from '../../../variables/admin/recipes-table-variables-pagination';

const RecipesTable = (props) => {

    const abrirEliminar = props.abrirModal;

    const [loading, setLoading] = useState(true);
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        const inicio = async() => {
            const resp = await UserService.verRecetas();
            console.log(resp.data)
            if(resp){
                setRecetas(resp.data);
                setLoading(false)
            }
        }
        inicio();
    }, []);

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Recetas
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        
                    </div>
                </div>
            </div>
            <div className = 'card-body'>
                {loading ? (
                    <>
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'secondary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    </>
                ):(
                    <>
                    <BootstrapTable 
                        keyField = 'id' 
                        data = { recetas } 
                        columns = { opciones.columnas(abrirEliminar) }
                        bootstrap4 = {true} 
                        noDataIndication={ opciones.vacio() }
                        pagination={ paginationFactory(opciones.opcionesPaginacion(recetas)) }
                        classes = 'table-striped'
                    />
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default RecipesTable;