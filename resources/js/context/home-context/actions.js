import axios from 'axios';

const API_URL = 'http://localhost/api/web';

const roboshotStations = (dispatch, login) => {
    dispatch({type: 'LOADING_HOME', log_status: login});
    const resp = axios.get(API_URL + '/inicio');
    return resp;
}

const recipesStation = (dispatch, id) => {
    dispatch({type: 'LOADING_RECIPES'});
    const resp = axios.get(API_URL + '/receta/'+id);
    return resp
}

const openModalSwitch = (dispatch, modal, data, e) => {
    e.preventDefault();
    let currentModal = {
        name: modal,
        data: data,
        open: true
    }
    dispatch({type: 'OPEN_MODAL', modalOpened: currentModal});
}

const closeModalSwitch = (dispatch, e) => {
    e.preventDefault();
    let currentModal = {
        name: '-',
        data: '',
        open: false
    }
    dispatch({type: 'CLOSE_MODAL', modalClosed: currentModal});
}

const ingredientsClient = (dispatch, id) => {
    dispatch({type: 'LOADING_INGREDIENTS'});
    const resp = axios.get(API_URL +'/ingredientes/'+id);
    return resp
}

export{
    roboshotStations,
    recipesStation,
    openModalSwitch,
    closeModalSwitch,
    ingredientsClient
}