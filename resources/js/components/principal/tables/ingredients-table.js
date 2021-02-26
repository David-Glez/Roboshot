import React from 'react';

//  estilos
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  variables
import opciones from '../../../variables/principal/ingredients-table-variables-pagination';

const IngredientesTable = (props) => {

    const ingredientes = props.ingredientes;
    const lista = props.lista;

    //  funciones
    const cantidades = props.cantidadBebida;
    
    return(
        <>
        <BootstrapTable 
            keyField = 'idIngrediente' 
            data = { ingredientes } 
            columns = { opciones.columnas(cantidades, lista) }
            bootstrap4 = {true} 
            noDataIndication={ opciones.vacio() }
            pagination={ paginationFactory(opciones.opcionesPaginacion(ingredientes)) }
            classes = 'table scrollDiv'
        />
        </>
    )

}

export default IngredientesTable;