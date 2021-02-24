import React, {useReducer} from 'react';

let current_user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : '';
 
const initialState = {
  loading: false,
  errorMessage: null,
  id_user: 0 || current_user.id,
  user: '' || current_user.usuario,
  rol: '' || current_user.rol,
  id_rol: 0 || current_user.idRol,
  access: false || current_user.autorizado,
  token: '' || current_user.accessToken,
  message: null,
  register: null
};

const AuthReducer = (initialState, action) => {
    switch (action.type) {
      case "REQUEST_LOGIN":
        return {
          ...initialState,
          loading: true,
          access: undefined,
          message: null
        };
      case "REQUEST_REGISTER":
        return {
          ...initialState,
          loading: true,
          access: undefined,
          message: null
        };
      case "LOGIN_SUCCESS":
        return {
          ...initialState,
          loading: false,
          id_user: action.payload.id,
          user: action.payload.usuario,
          rol: action.payload.rol,
          id_rol: action.payload.idRol,
          access: action.payload.autorizado,
          token: action.payload.accessToken,
          message: null
        };
      case "LOGOUT":
        return {
          ...initialState,
          errorMessage: null,
          id_user: 0 ,
          user: '' ,
          rol: '' ,
          id_rol: 0 ,
          access: false,
          token: '',
          message: action.logMessage 
        };
   
      case "LOGIN_ERROR":
        return {
          ...initialState,
          loading: false,
          errorMessage: action.error,
          access: false
        };
      case "REGISTER_SUCCESS":
        return{
          ...initialState,
          loading: false,
          message: action.success_msg,
          register: true
        }
      case "REGISTER_ERROR":
        return {
          ...initialState,
          loading: false,
          errorMessage: action.error,
          register: false
        };
   
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  export {
      initialState,
      AuthReducer
  }