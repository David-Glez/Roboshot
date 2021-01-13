import React from 'react';

import SinElementos from '../../components/alertas/vacio';
import RoboshotsTableButtons from '../../components/admin/buttons/roboshots-table-buttons';
import CustomSpan from '../../components/admin/buttons/custom-span'

//  informacion de las columnas de la tabla clientes
const columnas = (abrirModal) => {
    //  columnas para la tabla
    const data = [{
        dataField: 'id',
        text: 'ID'
    },{
        dataField: 'nombre',
        text: 'Nombre'
    },{
        dataField: 'cliente',
        text: 'Cliente'
    },{
        dataField: 'MAC',
        text: 'Dirección Física'
    },{
        dataField: 'estado',
        text: 'Estado',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return(
                <CustomSpan
                    estado = {row.estado} 
                />
            )
        }
    },{
        dataField: 'creado',
        text: 'Fecha Alta'
    },{
        dataField: '',
        text: "Acciones",
        sort: false,
        classes: 'text-center',
        formatter: (cell, row, rowIndex, formatExtraData) =>{
            return(
                <RoboshotsTableButtons
                    id = {row.id}
                    nombre = {row.nombre}
                    cliente = {row.cliente}
                    abrirModal = {abrirModal} 
                />
            )
        },
    }];

    return data;
}

//  opciones para mostrar en la paginacion de la tabla
const opcionesPaginacion = (roboshots) => {
    const total = roboshots.length;

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