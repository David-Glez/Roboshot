const initialState = {
    loading: false,
    module: '',
    login: false,
    error: false,
    success: false,
    successCode: 0,
    errorCode: 0,
    errorMessage: undefined,
    message: undefined,
    modal: {
        name: '-',
        data: '',
        open: false
    },
    cart: [],
    counter: 0,
    total: 0,
    client: 0,
    qrcode: ''
}

const HomeReducer = (initialState, action) => {
    let current_cart = initialState.cart;
    switch(action.type){
        case 'LOGOUT':
            return{
                ...initialState,
                login: false
            }
        case 'LOADING_HOME':
            return{
                ...initialState,
                loading: true,
                module: 'home',
                login: (action.log_status == undefined || action.log_status == null) ? false : action.log_status
            }
        case 'STATIONS_CHARGED':
            return{
                ...initialState,
                module: '',
                loading: false,
                error: false,
                errorCode: 0,
                errorMessage: undefined,
            }
            
        case 'LOADING_RECIPES':
            return{
                ...initialState,
                module: 'recipes_page',
                loading: true
            }
            
        case 'RECIPES_CHARGED':
            return{
                ...initialState,
                module: '',
                loading: false,
                client: action.id_client
            }
            
        case 'OPEN_MODAL':
            return{
                ...initialState,
                modal: action.modalOpened
            }
            
        case 'CLOSE_MODAL':
            return{
                ...initialState,
                modal: action.modalClosed
            }
        case 'LOADING_INGREDIENTS':
            return{
                ...initialState,
                loading: true,
                module: 'ingredients',
            }
            
        case 'INGREDIENTS_CHARGED':
            return{
                ...initialState, 
                loading: false,
                module: ''
            }
            
        case 'ADD_ORDER_CART':
            current_cart.push(action.order)
            return{
                ...initialState,
                counter: action.counter,
                total: action.total,
                cart: current_cart
            }
            
        case 'DELETE_ORDER_CART':
            current_cart.splice(action.index, 1)
            return{
                ...initialState,
                counter: action.counter,
                total: action.total,
                cart: current_cart,
            }
            
        case 'EMPTY_CART':
            return{
                ...initialState,
                counter: 0,
                total: 0,
                cart: [],
            }
        case 'ORDER_CART': 
            return {
                ...initialState,
                loading: true,
                module: 'order_cart'
            }
        case 'CART_SUCCESS':
            return{
                ...initialState,
                loading: false,
                module: '',
                counter: 0,
                cart: [],
                total: 0,
                qr_code: action.qr_code
            }
        case 'LOADING_USERDATA':
            return{
                ...initialState,
                loading: true,
                module: 'user_profile'
            }
        case 'USERDATA_CHARGED':
            return{
                ...initialState,
                loading: false,
                module: ''
            }
        case 'LOADING':
            return{
                ...initialState,
                loading: true,
                module: action.module
            }
        case 'CHARGED':
            return {
                ...initialState,
                loading: false,
                module: ''
            }
        case 'CATCH_QRCODE':
            return{
                ...initialState,
                qr_code: action.qr_code
            }
        case 'CATCH_SUCCESS':
            return{
                ...initialState,
                success: true,
                successCode: action.successCode,
                message: action.successMessage
            }
        case 'CATCH_ERROR':
            return{
                ...initialState,
                error: true,
                errorCode: action.errorCode,
                errorMessage: action.errorMessage
            }
        case 'CLEAR_ERROR':
            return{
                ...initialState,
                error: false, 
                errorCode: 0,
                errorMessage: undefined
            }
            
        case 'CLEAR_SUCCESS':
            return{
                ...initialState,
                success: false,
                successCode: 0,
                message: undefined
            }
            
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export {
    initialState,
    HomeReducer
}