import React, {useState, useEffect} from 'react';
import {useHomeDispatch, userInfo} from '../../../context';

const useUserData = (id) => {

    const [user, setUser] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const dispatch = useHomeDispatch();

    useEffect(() => {
        const home = async() => {
            try{
                const details = await userInfo(dispatch, id)
                if(details.status == 200){
                    dispatch({type: 'USERDATA_CHARGED'})
                    setUser(details.data.datosUsuario)
                    setOrdersList(details.data.pedidos)
                }

            }catch(error){

            }
        }
        home();
    }, []);

    return{user, ordersList}
}

export default useUserData;