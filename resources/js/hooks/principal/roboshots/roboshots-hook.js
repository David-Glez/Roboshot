import React, {useState, useEffect} from 'react';
import {useHomeDispatch, roboshotStations} from '../../../context';

const useRoboshotList = (login) => {
    const dispatch = useHomeDispatch();
    const [list, setList] = useState([]);

    useEffect(() => {
        const inicio = async() => {
            try{
                const lista = await roboshotStations(dispatch, login);
                if(lista.status == 200){
                    dispatch({type: 'STATIONS_CHARGED'})
                    setList(lista.data)
                }
            }catch(error){
                dispatch({type: 'ERROR_LOAD'});
                console.log(error)
            }
        }
        inicio()
    }, []);

    return{
        list
    }
}

export default useRoboshotList;