import React, {useContext} from 'react';

const useAuthState = (authStateContext) => {

    const context = useContext(authStateContext)
    console.log(context)
    if(context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context
}

export default useAuthState;