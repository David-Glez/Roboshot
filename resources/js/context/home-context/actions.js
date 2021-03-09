import axios from 'axios';
import authHeader from '../header-auth';

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
    //e.preventDefault();
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
    const total = price + parseFloat(order.precio);
    
    dispatch({
        type: 'ADD_ORDER_CART',
        counter: i,
        order: current_order,
        total: total
    })
    dispatch({
        type: 'CATCH_SUCCESS',
        successCode: 104,
        successMessage: 'Receta añadida al carrito'
    })

}

const deleteOrderToCart = (dispatch, recipe, total, counter) => {
    let index = recipe.prod - 1;
    let new_counter = counter -1;
    const new_total = total - recipe.precio;
    dispatch({
        type: 'DELETE_ORDER_CART',
        counter: new_counter,
        total: new_total,
        index: index
    })

    dispatch({
        type: 'CATCH_SUCCESS',
        successCode: 105,
        successMessage: 'Receta eliminada'
    })
}

const emptyCart = (dispatch) => {
    dispatch({type: 'EMPTY_CART'})
}

const orderCart = (dispatch, state, dataUser) => {
    if(state.login){
        if(state.cart != ''){
            let data = {
                usuario: dataUser.id_user,
                cliente: state.client,
                total: parseFloat(state.total).toFixed(2),
                lista: JSON.stringify(state.cart)
            };
            const send_cart = axios.post(API_URL + '/pedido/nuevo', data);
            dispatch({type: 'ORDER_CART'})
            send_cart.then((response) => {
                dispatch({type: 'CART_SUCCESS', qr_code: response.data})
                closeModalSwitch(dispatch);
                dispatch({
                    type: 'CATCH_SUCCESS',
                    successCode: 112,
                    successMessage: response.data
                })
                openModalSwitch(dispatch, 'qr_code', '')    //  TODO: check if render its ok
            }).catch((error) => {
                dispatch({
                    type: 'CATCH_ERROR',
                    errorCode: 111,
                    errorMessage: 'Error al guardar'
                })
            })
        }else{
            dispatch({
                type: 'CATCH_ERROR',
                errorCode: 109,
                errorMessage: 'No hay elementos en el carrito'
            })
        }
    }else{
        dispatch({
            type: 'CATCH_ERROR',
            errorCode: 108,
            errorMessage: 'No estas logueado. Inicia sesion o crea una cuenta para realizar tu pedido'
        })
    }
}

const userInfo = (dispatch, id) => {
    dispatch({type: 'LOADING_USERDATA'})
    const response = axios.get(API_URL +'/usuario/data/'+id, {headers: authHeader()})
    return response
}

const updateUser = (dispatch, data) => {
    dispatch({type: 'LOADING', module: 'sending_userdata'})
    const resp = axios.post(API_URL + '/usuario/data/actualizar', data, {headers: authHeader()})
    resp.then((response) => {
        dispatch({
            type: 'CATCH_SUCCESS',
            successCode: 201,
            successMessage: response.data.mensaje
        })
    }).catch((error) => {
        dispatch({type: 'CHARGED'})
        dispatch({
            type: 'CATCH_ERROR',
            errorCode: 202,
            errorMessage: error.response.data.mensaje
        })
    })
}

const orderedRecipeIngredients = () => {}

export{
    roboshotStations,
    recipesStation,
    openModalSwitch,
    closeModalSwitch,
    ingredientsClient,
    addOrderToCart,
    emptyCart,
    deleteOrderToCart,
    orderCart,
    userInfo,
    updateUser,
    orderedRecipeIngredients
}