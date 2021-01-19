import React from 'react';

//  estilos
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//  variables
import opciones from '../../../variables/principal/ingredients-table-variables-pagination';

const IngredientesTable = (props) => {

    const idCategoria = props.idCategoria;
    const ingredientes = props.ingredientes;

    //  funciones
    const cantidades = props.cantidadBebida;
    
    const filtro = ingredientes.filter(ing => ing.categoria == idCategoria);
    return(
        <>
        <BootstrapTable 
            keyField = 'idIngrediente' 
            data = { filtro } 
            columns = { opciones.columnas(cantidades) }
            bootstrap4 = {true} 
            noDataIndication={ opciones.vacio() }
            classes = 'table scrollDiv'
        />
        </>
    )

}

export default IngredientesTable;