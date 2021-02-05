import React from 'react';

import {Link} from 'react-router-dom';

//  libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const RecipesTableButtons = (props) => {

    const id = props.id;

    return(
        <>
        <Link 
            to = {{
                pathname: '/admin/recetas/editar',
                idRecipe: id
            }}
            className = 'btn btn-outline-secondary'
        >
            <FontAwesomeIcon icon = {faEdit} />
        </Link>
        </>
    )
}

export default RecipesTableButtons;