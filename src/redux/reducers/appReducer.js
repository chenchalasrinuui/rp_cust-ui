import { init } from '../init/init'

export const appRedcuer = (state = init, action) => {
    switch (action.type) {
        case '':
            return state
        default:
            return state
    }

}