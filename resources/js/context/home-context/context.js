import React, {createContext, useContext, useReducer} from 'react';
import {initialState, HomeReducer} from './reducer';

//  contains authentication token and user details
const HomeStateContext = createContext(); 
const HomeDispatchContext = createContext();

export function useHomeState(){
    const context = useContext(HomeStateContext)
    if(context === undefined) {
        throw new Error("useHomeState must be used within a HomePageProvider");
    }
    return context
}

export function useHomeDispatch(){
    const context = useContext(HomeDispatchContext)
    if(context === undefined) {
        throw new Error("useHomeDispatch must be used within a HomePageProvider");
    }
    return context
}

export const HomePageProvider = ({ children }) => {
    const [settings, dispatch] = useReducer(HomeReducer, initialState);
   
    return (
      <HomeStateContext.Provider value={settings}>
        <HomeDispatchContext.Provider value={dispatch}>
          {children}
        </HomeDispatchContext.Provider>
      </HomeStateContext.Provider>
    );
  };