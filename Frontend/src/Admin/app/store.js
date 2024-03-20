import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/users/UserApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";
import { scheduleApi } from "../features/Schedule/ScheduleApi";
import { positionApi } from "../features/Position/PositionApi";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath ]: employeeApi.reducer,
        [attendanceApi.reducerPath ]: attendanceApi.reducer,
        [scheduleApi.reducerPath ]: scheduleApi.reducer,
        [positionApi.reducerPath ]: scheduleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        employeeApi.middleware,
        attendanceApi.middleware,
        scheduleApi.middleware,
        positionApi.middleware,
    ),


})

setupListeners(store.dispatch);