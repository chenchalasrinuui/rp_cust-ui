import { createContext, useContext } from 'react'

const dafautValues = {
    theme: "'"
}

const appCtx = createContext(dafautValues)

export const useAppCtx = () => {
    return useContext(appCtx)
}

export const AppContextProvider = ({ children }) => {
    return <appCtx.Provider value={dafautValues}>
        {children}
    </appCtx.Provider>
}


