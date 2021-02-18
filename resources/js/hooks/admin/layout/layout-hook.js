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
        admin: undefined,

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
                })
            }
        }else{
            setLayout(layout => ({...layout, ['admin']: false}))
        }
        const inicio = async() => {
            
        }
        inicio();
    }, []);

    return {
        userData,
        layout
    }
}

export default useAdminLayout;