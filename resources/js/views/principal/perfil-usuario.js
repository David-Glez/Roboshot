import React from 'react';

//  componentes
import Loader from '../../components/alertas/loader';
import SinElementos from '../../components/alertas/vacio';
import CardDataUser from '../../components/principal/cards/card-data-usuario';
import CardPedidos from '../../components/principal/cards/pedidos-card';

//  context
import {useAuthState, useHomeState} from '../../context'
import useUserData from '../../hooks/principal/users/user-hook'

//  principal
const Perfil = () => {
    const userDetails = useAuthState();
    const settings = useHomeState();
    const {user, ordersList} = useUserData(userDetails.id_user)

    return(
        <>
        {(settings.loading == true && settings.module == 'user_profile')?(
            <div className = 'row superior'>
                <Loader />
            </div>
        ):(
            <>
            <div className = 'row'>
                <div className = 'col-md-4'>
                    <CardDataUser
                        dataUsuario = {user}
                    />
                </div>
                <div className = 'col-md-8'>
                    <CardPedidos
                        pedidos = {ordersList} 
                    />
                </div>
            </div>
            </>
        )}
        </>
    )
    
};

export default Perfil;