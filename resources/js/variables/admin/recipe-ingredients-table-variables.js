import React from 'react';

const columnas = () => {
    //  columnas para la tabla
    const data = [{
        dataField: 'idIngrediente',
        text: 'ID'
    },{
        dataField: 'categoria',
        text: 'Categoria'
    },{
        dataField: 'marca',
        text: 'Marca'
    },{
        dataField: 'cantidad',
        text: 'Cantidad'
    },{
        dataField: 'precio',
        text: 'Precio'
    }];

    return data;
}

//  opciones para mostrar en la paginacion de la tabla
const opcionesPaginacion = (ingredients) => {
    const total = ingredients.length;

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
        }] 
      };

      return options;
}

//  regresa el elemento vacio
const vacio = () => {
    return(
        <div className = 'row superior'>
            
        </div>
    )
}

export default {
    opcionesPaginacion,
    vacio,
    columnas
}