import React from 'react';

//  componentes
import SinElementos from '../../alertas/vacio';
import {useHomeDispatch, openModalSwitch} from '../../../context'

const CardPedidos = (props) => {
    const lista = props.pedidos;
    const dispatch = useHomeDispatch();

    return(
        <>
        <div className = 'card'>
            <div className = 'card-header'>
                <h5 className="card-title">Tus Pedidos</h5>
            </div>
            <div className = 'card-body'>
                {(lista == '') ? (
                    <>
                    <div className = 'row superior'>
                        <SinElementos />
                    </div>
                    </>
                ):(
                    <ul className = 'list-group  scrollDiv'>
                        {lista.map((item, index) => {
                            return(
                                <li className = 'list-group-item' key = {index} >
                                    <a href = '#' onClick = {(e) => openModalSwitch(dispatch, 'order_item', item, e)}>
                                        <div className = 'row'>
                                            <div className = 'col-sm-6'>
                                                {item.codigo}
                                            </div>
                                            <div className = 'col-sm-6'>
                                                <span className = 'text-success'>
                                                    ${parseFloat(item.total).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}

export default CardPedidos;