import React from 'react';

import SinElementos from '../../components/alertas/vacio';
import IngredientesButtons from '../../components/principal/buttons/ingredients-table-buttons';

//  informacion de las columnas de la tabla clientes
const columnas = (cantidades) => {
    //  columnas para la tabla
    const data = [{
        dataField: 'idIngrediente',
        text: '#'
    },{
        dataField: 'marca',
        text: 'Marca'
    },{
        dataField: 'precio',
        text: 'Precio'
    },{
        dataField: '-',
        text: "Cantidad",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) =>{
            
            return(
                <IngredientesButtons
                    id = {row.idIngrediente}
                    precio = {row.precio}
                    cantidades = {cantidades}
                />
            )
        },
    }];

    return data;
}

//  opciones para mostrar en la paginacion de la tabla
const opcionesPaginacion = (ingredientes) => {
    const total = ingredientes.length;

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Mostrando { from } a { to } de { size } resultados
        </span>
    );

    const options = {
        paginationSize: 3,
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
            text: '3', value: 3
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
