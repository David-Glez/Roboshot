import React, {useContext} from 'react';

const useAuthDispatch = (authDispatchContext) => {

    const context = useContext(authDispatchContext);
    if(context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context

}

export default useAuthDispatch;