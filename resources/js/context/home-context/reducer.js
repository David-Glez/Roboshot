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
    total: 0 
}

const HomeReducer = (initialState, action) => {
    switch(action.type){
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
                loading: false
            }
        case 'ERROR_LOAD':
            return{
                ...initialState,
                error: true,
                errorCode: 0, //TODO: asign a code number 
                errorMessage: 'Error',
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
                error: false, 
                errorCode: 0,
                errorMessage: undefined
            }
        case 'INGREDIENTS_CHARGED':
            return{
                ...initialState, 
                loading: false,
                module: ''
            }
        case 'NOT_INGREDIENTS':
            return{
                ...initialState,
                error: true, 
                errorCode: 1,
                errorMessage: 'La receta está vacia o excede su tamaño.'
            }
        case 'ADD_ORDER_CART':
            let current_cart = initialState.cart;
            current_cart.push(action.order)
            return{
                ...initialState,
                counter: action.counter,
                total: action.total,
                cart: current_cart,
                success: true, 
                successCode: 101,
                message: 'Receta añadida al carrito :)'
            }
        case 'DELETE_ORDER_CART':
            
        case 'EMPTY_CART':
            return{
                ...initialState,
                counter: 0,
                total: 0,
                cart: [],
                success: true,
                successCode: 103,
                message: 'El carrito se ha vaciado'
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