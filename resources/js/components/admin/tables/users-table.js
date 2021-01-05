import React, {useState, useEffect} from 'react';

//  Estilos
import {Spinner} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  API url
import UserService from '../../../services/auth/servicioUsuarios';

//  componentes
import SinElementos from '../../alertas/vacio';
import UsersTableButtons from '../buttons/users-table-buttons';
import ClientAddButton from '../buttons/users-add-button';

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

    const vacio = () => {
        return(
            <>
            <div className = 'row superior'>
                <SinElementos />
            </div>
            </>
        )
    }

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Mostrando { from } a { to } de { size } resultados
        </span>
    );
    
    const options = {
        paginationSize: 5,
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: '<<-',
        prePageText: '<',
        nextPageText: '>',
        lastPageText: '->>',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '15', value: 15
        },{
            text: 'Todos', value: usuarios.length
        }] 
      };

    //  columnas para la tabla
    const columnas = [{
        dataField: 'id',
        text: 'ID'
    },{
        dataField: 'usuario',
        text: 'Nombre'
    },{
        dataField: 'razonSocial',
        text: 'Razón Social'
    },{
        dataField: 'rol',
        text: 'Rol'
    },{
        dataField: 'esquema',
        text: 'Base de Datos'
    },{
        dataField: 'roboshots',
        text: 'Roboshots'
    },{
        dataField: 'fechaCreacion',
        text: 'Fecha de Alta'
    },{
        dataField: '',
        text: "Acciones",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) =>{
            return(
                <UsersTableButtons
                    id = {row.id}
                    nombre = {row.usuario}
                    razonSocial = {row.razonSocial}
                    abrirModal = {props.abrirModalDelete} 
                />
            )
        },
    }];

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
                        columns = { columnas }
                        bootstrap4 = {true} 
                        noDataIndication={ vacio }
                        pagination={ paginationFactory(options) }
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