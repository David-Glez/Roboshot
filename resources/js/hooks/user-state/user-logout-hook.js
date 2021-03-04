import React from 'react';
import {useAuthDispatch, logoutUser, useHomeDispatch} from '../../context'

const useUserLogout = () => {
    
    const dispatch = useAuthDispatch();
    const homeDispatch = useHomeDispatch()
    const log_out = (e) => {
        e.preventDefault();
        logoutUser(dispatch, homeDispatch)
    }

    return { log_out}
}

export default useUserLogout;