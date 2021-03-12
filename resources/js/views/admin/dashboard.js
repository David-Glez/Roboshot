import React, {useState, useEffect} from 'react';

//  componentes
import StatsCard from '../../components/admin/stats-card/statscards';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAuthState} from '../../context'

const DashBoard = (props) => {

    const userDetails = useAuthState();

    return (
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    {(userDetails.state_cards != undefined) && (
                        <>
                        {userDetails.state_cards.map((x, item) =>
                        <div className = 'col-md-4' key = {item}>
                            <StatsCard 
                                statsText = {x.nombre}
                                statsValue = {x.total}
                                bigIcon = {<FontAwesomeIcon icon = {x.icono} className = 'text-primary'/>}
                                statsIcon = {x.fecha}
                                statsIconText = {x.mensaje}
                            />
                        </div>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default DashBoard;