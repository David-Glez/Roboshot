import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

//funcion para el login y acceder a sistema de administracion
const login = (credenciales) =>{
    
    return axios
        .post(API_URL + '/login', credenciales)
        .then((response) =>{
            if(response.data.accessToken){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

//  funcion para registrar a los clientes
const registrar = (data) => {
    return axios
        .post(API_URL + '/registrar', data)
};

//funcion para ver el tiempo de vida de la sesion
const sessionLive = () =>{
    return axios.get(API_URL+'/sesion');
};

//funcion para cerrar sesion
const logout = () =>{
    
    return axios
            .post(API_URL + '/logout')
            .then((response) =>{
                if(response.data.status){
                    localStorage.removeItem('user');
                }
                return response;
            });
};

//funcion para tomar los elementos del usuario
const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem('user'));
};

//exportacion de funciones
export default{
    login,
    registrar,
    logout,
    sessionLive,
    getCurrentUser
}