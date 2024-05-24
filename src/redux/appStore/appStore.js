import { configureStore } from "@reduxjs/toolkit";
import { appRedcuer } from "../reducers/appReducer";
import logger from "redux-logger";

export const appStore = configureStore({
    reducer: {
        appRedcuer
    },
    middleware: () => {
        return [logger]
    }
})