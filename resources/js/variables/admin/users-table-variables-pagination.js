import React from 'react';

import SinElementos from '../../components/alertas/vacio';
import UsersTableButtons from '../../components/admin/buttons/users-table-buttons';

//  informacion de las columnas de la tabla clientes
const columnas = (abrirModal) => {
    //  columnas para la tabla
    const data = [{
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
                    abrirModal = {abrirModal} 
                />
            )
        },
    }];

    return data;
}

//  opciones para mostrar en la paginacion de la tabla
const opcionesPaginacion = (usuarios) => {
    const total = usuarios.length;

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
            text: 'Todos', value: total
        }] 
      };

      return options;
}

//  regresa el elemento vacio
const vacio = () => {
    return(
        <div className = 'row superior'>
            <SinElementos />
        </div>
    )
}

export default {
    opcionesPaginacion,
    vacio,
    columnas
}

