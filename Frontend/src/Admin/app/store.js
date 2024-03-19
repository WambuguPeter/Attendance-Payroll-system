import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/users/UserApi";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath ]: employeeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        employeeApi.middleware,
    ),


})

setupListeners(store.dispatch);