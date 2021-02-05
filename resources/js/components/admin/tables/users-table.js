import React, {useState, useEffect} from 'react';

//  Estilos
import {Spinner} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  componentes
import ClientAddButton from '../buttons/users-add-button';

//  variables
import opciones from '../../../variables/admin/users-table-variables-pagination';

const UsersTable = (props) => {
    
    const abrirEliminar = props.abrirModalDelete;

    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const inicio = async() => {
            const result = await UserService.verUsuarios();
            setUsuarios(result.data)
            if(result){
                setLoading(false);
            }
        };
        inicio();
    },[]);

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <div className = 'row'>
                    <div className = 'col-sm-4'>
                        <h3 className = 'card-title'>
                            Usuarios
                        </h3>
                    </div>
                    <div className = 'col-sm-8'>
                        <ClientAddButton />
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
                        data = { usuarios } 
                        columns = { opciones.columnas(abrirEliminar) }
                        bootstrap4 = {true} 
                        noDataIndication={ opciones.vacio() }
                        pagination={ paginationFactory(opciones.opcionesPaginacion(usuarios)) }
                        classes = 'table-striped'
                    />
                    </>
                )}
            </div>
        </div>
        </>
    )
};

export default UsersTable;