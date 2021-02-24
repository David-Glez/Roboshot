import React from 'react';
import {useAuthDispatch, logoutUser} from '../../context'

const useUserLogout = () => {
    
    const dispatch = useAuthDispatch();

    const log_out = (e) => {
        e.preventDefault();
        logoutUser(dispatch)
    }

    return { log_out}
}

export default useUserLogout;