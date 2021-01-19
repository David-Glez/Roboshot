import React, {useState} from 'react';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IngredientesButtons = (props) => {

    const id = props.id;
    const cantidades = props.cantidades;

    const [cantidad, setCantidad] = useState(0);

    const mas = () => {
        const ml = cantidad + 10;
        setCantidad(ml)
        cantidades(id, ml)
    }

    const menos = () => {
        const ml = cantidad -10;
        if(ml < 0){
            toast.warning('El tamaño mínimo es de 0 mL.',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                draggable: true,
                pauseOnHover: true,
                progress: undefined
            }); 
        }else{
            setCantidad(ml)
            cantidades(id, ml)
        }
        
    }

    return(
        <>
        <div className = 'field pb-2'>
            <span className = 'input-number-decrement' onClick = {(e) => menos(e)} >-</span>
                <input 
                className = 'ing-list' 
                type = 'text'
                name = {'ingrediente'+id} 
                value = {cantidad}
                disabled 
                ></input>
            <span className = 'input-number-increment' onClick = {(e) => mas(e)} >+</span>
        </div>
        </>
    )
}

export default IngredientesButtons