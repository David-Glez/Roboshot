import { AuthProvider, useAuthDispatch, useAuthState } from './user-context/context';
import {loginUser, logoutUser, registerUser} from './user-context/actions';

import{ HomePageProvider, useHomeDispatch, useHomeState} from './home-context/context';
import {
    roboshotStations, 
    recipesStation, 
    openModalSwitch, 
    closeModalSwitch, 
    ingredientsClient,
    addOrderToCart,
    emptyCart,
    deleteOrderToCart,
    orderCart, 
    userInfo
} from './home-context/actions';

export {
    AuthProvider, 
    useAuthState, 
    useAuthDispatch, 
    loginUser, 
    logoutUser, 
    registerUser,
    HomePageProvider,
    useHomeDispatch,
    useHomeState, 
    roboshotStations,
    recipesStation,
    openModalSwitch,
    closeModalSwitch,
    ingredientsClient,
    addOrderToCart,
    emptyCart,
    deleteOrderToCart,
    orderCart,
    userInfo
}