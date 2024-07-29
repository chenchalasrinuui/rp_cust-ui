import { init } from '../init/init'

export const appReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
        case 'AUTH':
            return {
                ...state,
                ...action.payload
            }
        case 'MENU':
            return {
                ...state,
                isShowMenu: action.payload
            }
        case 'TOASTER':
            return {
                ...state,
                toaster: action.payload
            }
        default:
            return state
    }

}