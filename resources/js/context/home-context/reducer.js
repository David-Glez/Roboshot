const initialState = {
    loading: false,
    module: '',
    login: false,
    error: false,
    errorCode: 0,
    errorMessage: undefined,
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
                module: 'ingredients'
            }
        case 'INGREDIENTS_CHARGED':
            return{
                ...initialState, 
                loading: false,
                module: ''
            }
        case 'ADD_ORDER_CART':
            return{
                ...initialState,
                counter: action.counter,
                cart: cart.push(action.order)
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export {
    initialState,
    HomeReducer
}