import React, {useState, useEffect} from 'react';

//  componentes
import StatsCard from '../../components/admin/stats-card/statscards';

//  API url
import UserService from '../../services/auth/servicioUsuarios';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashBoard = (props) => {

    const [card, setCard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inicio = async() => {
            const resp =  await UserService.statsCard();
            if(resp){
                setLoading(false)
                setCard(resp.data)
                console.log(resp.data)
            }
        }
        inicio();
    },[]);

    

    return (
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    {card.map((x, item) =>
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

/*
<div className = 'col-md-4'>
                        <StatsCard 
                            loading = {loading}
                            statsText = 'Usuarios'
                            statsValue = {noUsers.noUsuarios}
                            bigIcon = {<FontAwesomeIcon icon = 'users' className = 'text-primary'/>}
                            statsIcon = {noUsers.fechaUsuario}
                            statsIconText = {noUsers.mensaje}
                        />
                    </div>*/
export default DashBoard;