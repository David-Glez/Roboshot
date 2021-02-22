import React, {createContext, useContext, useReducer} from 'react';
//  custom hooks
//import useAuthState from '../hooks/user-state/auth-state-hook';
//import useAuthDispatch from '../hooks/user-state/auth-dispatch-hook';

//  contains authentication token and user details
const AuthStateContext = createContext();
//  
const AuthDispatchContext = createContext();

export function useAuthState(){
    const context = useContext(AuthStateContext)
    console.log(context)
    if(context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context
}

export function useAuthDispatch(){
    const context = useContext(AuthDispatchContext)
    console.log(context)
    if(context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
   
    return (
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    );
  };