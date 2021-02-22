import React, {useState, useEffect} from 'react';
import AuthService from '../../../services/auth/autenticacion';
import UserService from '../../../services/auth/servicioUsuarios';

const useAdminLayout = () => {

    const [userData, setUserData] = useState({
        id: 0,
        idRol: 0,
        usuario: '',
        rol: '',
        autorizado: null
    });

    const [layout, setLayout] = useState({
        loading: true,
        logout: false,
        admin: true,
        cards: [],
        routes: []
    });

    useEffect(() => {
        const resp =  AuthService.getCurrentUser();
        if(resp != null){
            if(resp.idRol == 4){
                setLayout(layout => ({...layout, ['admin']: false}))
            }else{
                setUserData({
                    id: resp.id,
                    idRol: resp.idRol, 
                    usuario: resp.usuario,
                    rol: resp.rol,
                    autorizado: resp.autorizado
                });
            }
        }else{
            setLayout(layout => ({...layout, ['admin']: false}))
        }
        const inicio = async() => {
            const routes = await UserService.rutasRol();
            const statsCards =  await UserService.statsCard();

            if(routes && statsCards){
                setLayout(layout => ({...layout, ['cards']: statsCards.data}))
                setLayout(layout => ({...layout, ['routes']: routes.data}));
                setLayout(layout => ({...layout, ['loading']: false}));
            }
        }
        inicio();
    }, []);

    const logOut = () => {
        setLayout(layout => ({...layout, ['logout']: true}));
        const closed = AuthService.logout();
        closed.then((response) => {
            if(response.data.status){
                setUserData({
                    id: 0,
                    idRol: 0,
                    usuario: '',
                    rol: '',
                    autorizado: null
                });
                setLayout(layout => ({...layout, ['cards']: []}));
                setLayout(layout => ({...layout, ['routes']: []}));
                setLayout(layout => ({...layout, ['admin']:false}));
            }
        });
    }

    return {
        userData,
        layout,
        logOut
    }
}

export default useAdminLayout;