import React from 'react';

//  estilos
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  variables
import opciones from '../../../variables/principal/ingredients-list-table-variables';

const IngredientsListTable = (props) => {

    const ingredients = props.ingredients;

    return(
        <>
        <BootstrapTable 
            keyField = 'idIngrediente' 
            data = { ingredients } 
            columns = { opciones.columnas(ingredients) }
            bootstrap4 = {true} 
            noDataIndication={ opciones.vacio() }
            pagination={ paginationFactory(opciones.opcionesPaginacion(ingredients)) }
            classes = 'table scrollDiv'
        />
        </>
    )

}

export default IngredientsListTable;