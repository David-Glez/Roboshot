import React from 'react';

//  navegacion
import {Switch, Route} from 'react-router-dom';

//  componentes
import RecipesTable from '../../components/admin/tables/recipes-table';
import RecipesUpdate from '../../components/admin/forms/recipes-edit-form';

const RecipesAdmin = (props) => {

    //  abre el modal
    const abrirModalEliminar = (id) => {
        console.log(id);
        console.log('abierto')
    }

    return(
        <>
        <div className = 'content'>
            <div className = 'row'>
                <div className = 'col-md-12'>
                    <Switch>
                        <Route exact path = '/admin/recetas'>
                            <RecipesTable
                                 abrirModal = {(e) => abrirModalEliminar(e)}
                            />
                        </Route>
                        <Route exact path = '/admin/recetas/editar'>
                            <RecipesUpdate
                                location = {props.location} 
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
        </>
    )

}

export default RecipesAdmin;