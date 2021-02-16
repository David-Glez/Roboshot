import React from 'react';
import opciones from '../../../variables/admin/recipe-ingredients-table-variables';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const RecipeIngredients = (props) => {

    const ingredients = props.ingredients;

    return(
        <>
        
        <BootstrapTable 
            keyField = 'id' 
            data = { ingredients } 
            columns = { opciones.columnas() }
            bootstrap4 = {true} 
            noDataIndication={ opciones.vacio() }
            pagination={ paginationFactory(opciones.opcionesPaginacion(ingredients)) }
            classes = 'table-striped'
        />
                    
        </>
    )
}

export default RecipeIngredients;