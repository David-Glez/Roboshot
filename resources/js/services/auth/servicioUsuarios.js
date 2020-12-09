import axios from 'axios';

import authHeader from './header-auth';

// direccion para el control de sistema de administracion local
//const API_URL = "http://localhost:8081/api/auth";

//  pruebas en heroku
const API_URL = "https://roboshot-integra.herokuapp.com/api/auth";

/*****      FUNCIONES PARA MANEJO DE USUARIOS       *****/

//  mostrar la lista de usuarios
const verUsuarios = () => {
  return axios.get(API_URL + '/usuarios', {headers: authHeader()});
};

//  anadir un nuevo cliente
const nuevoCliente = (data) => {
  return axios.post(API_URL + '/usuarios/anadir', data, {headers: authHeader()});
}

// ver lista de clientes
const clientes = () => {
  return axios.get(API_URL + '/clientes', {headers: authHeader()});
};

/**************************************************/

/*****      FUNCIONES PARA MANEJO DE ROBOSHOTS      *****/

// Mostrar la lista de roboshots registrados
const verRoboshots = () =>{
  return axios.get(API_URL + '/roboshots', {headers: authHeader()});
};

//   muestra si el nombre de la base de datos esta disponible
const disponible = (data) => {
  return axios.post(API_URL + '/roboshots/revisar', data, {headers: authHeader()});
}

/**************************************************/
  const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  };
  
  const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  };
  
  const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  };
  
  export default {
    verUsuarios,
    verRoboshots,
    disponible,
    clientes,
    nuevoCliente,
    getModeratorBoard,
    getAdminBoard,
  };