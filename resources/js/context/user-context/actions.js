import axios from 'axios';
import authHeader from '../header-auth';
//  for development
const API_URL = 'http://localhost/api/auth';

//  for production
//  const API_URL = 'https://roboshot-integra.herokuapp.com';
//  login
const loginUser = (dispatch, loginPayload) => {
    dispatch({type: 'REQUEST_LOGIN'});
    const resp = axios.post(API_URL +'/login', loginPayload);
    resp.then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        return response.data
    }).catch((error) => {
        dispatch({type: 'LOGIN_ERROR', error: error.response.data.mensaje});
    })
}

const logoutUser = (dispatch, homeDispatch) => {
    const resp = axios.get(API_URL+'/logout', {headers: authHeader()});
    resp.then((response) => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT', logMessage: response.data.mensaje});
        homeDispatch({type: 'LOGOUT'})
        return response.data
    }).catch((error) => {
        localStorage.removeItem('user');
        console.log(error.response.data)
        dispatch({type: 'TOKEN_EXPIRED'});
    })
}

const registerUser = (dispatch, dataPayload) => {
    dispatch({type: 'REQUEST_REGISTER'});
    const resp = axios.post(API_URL+'/registrar', dataPayload);
    resp.then((response) => {
        dispatch({ type: 'REGISTER_SUCCESS', success_msg: response.data.mensaje });
    }).catch((error) => {
        dispatch({type: 'REGISTER_ERROR', error: error.response.data.mensaje});
    })
}


export {
    loginUser,
    logoutUser,
    registerUser
}