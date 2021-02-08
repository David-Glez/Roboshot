import React from 'react';

import SinElementos from '../../components/alertas/vacio';
import IngredientsPrice from '../../components/principal/buttons/ingredients-price-button';
import IngredientsQuantity from '../../components/principal/buttons/ingredients-quantity-button';

//  informacion de las columnas de la tabla clientes
const columnas = (lista) => {
    //  columnas para la tabla
    const data = [{
        dataField: 'idIngrediente',
        text: '#'
    },{
        dataField: 'marca',
        text: 'Marca'
    },{
        dataField: '',
        text: 'Precio',
        sort: false, 
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return(
                <IngredientsPrice
                    price = {row.precio}
                />
            )
        }
    },{
        dataField: '-',
        text: "Cantidad",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) =>{
            
            return(
                <IngredientsQuantity
                    quantity = {row.cantidad}
                    
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
