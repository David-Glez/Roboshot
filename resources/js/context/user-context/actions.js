import axios from 'axios';
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

const logoutUser = () => {

}

export {
    loginUser,
    logoutUser
}