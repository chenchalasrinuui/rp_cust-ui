import { init } from '../init/init'

export const appRedcuer = (state = init, action) => {
    switch (action.type) {
        case 'LOADER':
            return {
                ...state,
                isShowLoader: action.payload
            }
        default:
            return state
    }

}