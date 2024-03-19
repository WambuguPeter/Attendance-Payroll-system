import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/users/UserApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath ]: employeeApi.reducer,
        [attendanceApi.reducerPath ]: attendanceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        employeeApi.middleware,
        attendanceApi.middleware,
    ),


})

setupListeners(store.dispatch);