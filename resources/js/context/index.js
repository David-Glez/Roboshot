import { AuthProvider, useAuthDispatch, useAuthState } from './user-context/context';
import {
    loginUser, 
    logoutUser, 
    registerUser,
    getRoutesAndStateCards
} from './user-context/actions';

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
    userInfo,
    updateUser,
    orderedRecipeIngredients
} from './home-context/actions';

export {
    AuthProvider, 
    useAuthState, 
    useAuthDispatch, 
    loginUser, 
    logoutUser, 
    registerUser,
    getRoutesAndStateCards,
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
    userInfo,
    updateUser,
    orderedRecipeIngredients
}