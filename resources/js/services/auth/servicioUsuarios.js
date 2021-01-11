import axios from 'axios';

import authHeader from './header-auth';

//direccion para el control de sistema de administracion 
const API_URL = "http://localhost/api/auth";

/*****      FUNCIONES PARA MANEJO DE USUARIOS       *****/

//  mostrar la lista de usuarios
const verUsuarios = () => {
  return axios.get(API_URL + '/usuarios', {headers: authHeader()});
};

//  anadir un nuevo cliente
const nuevoCliente = (data) => {
  return axios.post(API_URL + '/usuarios/anadir', data, {headers: authHeader()});
}

//  ver datos de un cliente
const infoCliente = (id) => {
  return axios.get(API_URL + '/usuarios/'+id, {headers: authHeader()})
}

//  editar datos del cliente
const editarCliente = (data) => {
  return axios.post(API_URL + '/usuarios/editar', data, {headers: authHeader()});
}

//  eliminar un cliente
const eliminarCliente = (data) => {
  return axios.post(API_URL + '/usuarios/eliminar', data, {headers: authHeader()});
}

/**************************************************/

/*****      FUNCIONES GENERALES       *****/

//  informacion para cards
const statsCard = () => {
  return axios.get(API_URL + '/general/stats', {headers: authHeader()});
}

//  devuelve las rutas que le corresponden a cada usuario
const rutasRol = () => {
  return axios.get(API_URL + '/general/rutas', {headers: authHeader()});
}

//  devuelve la lista de clientes
const clientes = () => {
  return axios.get(API_URL + '/general/clientes', {headers: authHeader()});
}

/**************************************************/

/*****      FUNCIONES PARA MANEJO DE ROBOSHOTS      *****/

// Mostrar la lista de roboshots registrados
const verRoboshots = () =>{
  return axios.get(API_URL + '/roboshots', {headers: authHeader()});
};

//  inserta una nueva estacion fisica
const anadirRoboshot = (data) => {
  return axios.post(API_URL + '/roboshots/anadir', data, {headers: authHeader()});
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
    statsCard,
    verUsuarios,
    verRoboshots,
    anadirRoboshot,
    clientes,
    nuevoCliente,
    infoCliente,
    editarCliente,
    eliminarCliente,
    rutasRol,
    getModeratorBoard,
    getAdminBoard,
  };