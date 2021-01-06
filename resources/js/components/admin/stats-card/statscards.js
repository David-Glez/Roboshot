import React from 'react';

//  estilos 
import {Spinner} from 'react-bootstrap'

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatsCard = (props) => {
    const loading = props.loading;
    const statsText = props.statsText;
    const statsValue = props.statsValue;
    const bigIcon = props.bigIcon;
    const statsIcon = props.statsIcon;
    const statsIconText = props.statsIconText

    //  muestra el icono dependiendo de la fecha de modificacion
    const icono = () => {
        if(statsIcon){
            const date1 = new Date();
            const date2 = new Date(statsIcon);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = (diffTime / (1000 * 60 * 60)); 
            if(diffDays < 24){
                return(
                    <FontAwesomeIcon icon = 'clock' />
                )
            }else{
                return(
                    <FontAwesomeIcon icon = 'calendar' />
                )
            }
        }else{
            return(
                <FontAwesomeIcon icon = 'times' />
            )
        }
        
    }

    return(
        <>
        <div className = 'card card-stats'>
            <div className = 'content'>
                { loading ? (
                    <>
                    <div className = 'text-center'>
                        <Spinner animation = 'border' variant = 'secondary' role = 'status'>
                            <span className = 'sr-only'>Cargando...</span>
                        </Spinner>
                    </div>
                    </>
                    ):(
                    <>
                    <div className = 'row'>
                        <div className = 'col-sm-5'>
                            <div className = 'icon-big text-center icon-warning'>
                                {bigIcon}
                            </div> 
                        </div>
                        <div className = 'col-sm-7'>
                            <div className = 'numbers'>
                                <p>{statsText}</p>
                                {statsValue}
                            </div>
                        </div>
                    </div>
                    <div className = 'footerAdmin'>
                        <hr />
                        <div className = 'stats'>
                            {icono()} {statsIconText}
                        </div>
                    </div>
                    </> 
                )}
                
            </div>
        </div>
        </>
    )
}

export default StatsCard;