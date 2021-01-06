import React, {useState, useEffect} from 'react';

//  componentes
import StatsCard from '../../components/admin/stats-card/statscards';

//  API url
import UserService from '../../services/auth/servicioUsuarios';

//libreria de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashBoard = (props) => {

    const [noUsers, setNoUsers] = useState({
        noUsuarios: 0,
        mensaje: '',
        fechaUsuario: ''
    });
    const [noClients, setNoClients] = useState({
        noClientes: 0,
        mensaje: '',
        fechaCliente: ''
    });
    const [noRoboshots, setNoRoboshots] = useState({
        noRoboshots: 0,
        mensaje: '',
        fechaRoboshot: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inicio = async() => {
            const resp =  await UserService.statsCard();
            if(resp){
                setLoading(false)
            }
            setNoUsers({
                noUsuarios: resp.data.usuarios,
                mensaje: resp.data.mensajeUsuario,
                fechaUsuario: resp.data.fechaUsuario
            });
            setNoClients({
                noClientes: resp.data.clientes,
                mensaje: resp.data.mensajeCliente,
                fechaCliente: resp.data.fechaCliente
            });
            setNoRoboshots({
                noRoboshots: resp.data.roboshots,
                mensaje: resp.data.mensajeRoboshot,
                fechaUsuario: resp.data.fechaRoboshot
            })
        }
        inicio();
    },[]);

    

    return (
        <>
        <div className = 'content'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-4'>
                        <StatsCard 
                            loading = {loading}
                            statsText = 'Usuarios'
                            statsValue = {noUsers.noUsuarios}
                            bigIcon = {<FontAwesomeIcon icon = 'users' className = 'text-primary'/>}
                            statsIcon = {noUsers.fechaUsuario}
                            statsIconText = {noUsers.mensaje}
                        />
                    </div>
                    <div className = 'col-md-4'>
                        <StatsCard 
                            loading = {loading}
                            statsText = 'Clientes'
                            statsValue = {noClients.noClientes}
                            bigIcon = {<FontAwesomeIcon icon = 'user-tie' className = 'text-primary'/>}
                            statsIcon = {noClients.fechaCliente}
                            statsIconText = {noClients.mensaje}
                        />
                    </div>
                    <div className = 'col-md-4'>
                        <StatsCard 
                            loading = {loading}
                            statsText = 'Roboshots'
                            statsValue = {noRoboshots.noRoboshots}
                            bigIcon = {<FontAwesomeIcon icon = 'beer' className = 'text-warning'/>}
                            statsIcon = {noRoboshots.fechaRoboshot}
                            statsIconText = {noRoboshots.mensaje}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DashBoard;