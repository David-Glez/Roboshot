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

const addOrderToCart = (dispatch, order, counter, price) => {
    let i = counter + 1;
    let current_order = {
        prod: i,
        idReceta: order.idReceta,
        idCliente: order.idCliente,
        nombre: order.nombre,
        cliente: order.cliente,
        descripcion: order.descripcion,
        precio: parseFloat(order.precio).toFixed(2),
        img: order.img,
        ingredientes: JSON.stringify(order.ingredientes)
    }
    const total = price + order.precio;
    
    dispatch({
        type: 'ADD_ORDER_CART',
        counter: i,
        order: current_order,
        total: total
    })
}

const deleteOrderToCart = (dispatch, recipe) => {
    console.log(recipe)
}

const emptyCart = (dispatch) => {

}

const orderCart = () => {

}

export{
    roboshotStations,
    recipesStation,
    openModalSwitch,
    closeModalSwitch,
    ingredientsClient,
    addOrderToCart,
    emptyCart,
    deleteOrderToCart,
    orderCart
}