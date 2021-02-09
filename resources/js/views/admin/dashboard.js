import React, {useState, useEffect} from 'react';

//  componentes
import StatsCard from '../../components/admin/stats-card/statscards';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashBoard = (props) => {

    const loading = props.loading;
    const cards = props.cards;

    return (
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    {cards.map((x, item) =>
                    <div className = 'col-md-4' key = {item}>
                        <StatsCard 
                            loading = {loading}
                            statsText = {x.nombre}
                            statsValue = {x.total}
                            bigIcon = {<FontAwesomeIcon icon = {x.icono} className = 'text-primary'/>}
                            statsIcon = {x.fecha}
                            statsIconText = {x.mensaje}
                        />
                    </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default DashBoard;