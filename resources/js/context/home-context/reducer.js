import { faBullseye } from "@fortawesome/free-solid-svg-icons"

const initialState = {
    loading: false,
    login: false,
    error: false,
    errorMessage: undefined,
    counter: 0,
    modal: {
        name: '-',
        data: '',
        open: false
    },
    cart: []
}

const HomeReducer = (initialState, action) => {
    switch(action.type){
        case 'LOADING_HOME':
            return{
                ...initialState,
                loading: true,
                login: (action.log_status == undefined || action.log_status == null) ? false : action.log_status
            }
        case 'STATIONS_CHARGED':
            return{
                ...initialState,
                loading: false,
            }
        case 'LOADING_RECIPES':
            return{
                ...initialState,
                loading: true
            }
        case 'RECIPES_CHARGED':
            return{
                ...initialState,
                loading: false
            }
        case 'ERROR_LOAD':
            return{
                ...initialState,
                error: true,
                errorMessage: 'Error'
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
                loading: true
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export {
    initialState,
    HomeReducer
}