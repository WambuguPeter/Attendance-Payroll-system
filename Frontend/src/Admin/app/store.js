import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/users/UserApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";
import { scheduleApi } from "../features/Schedule/ScheduleApi";
import { overtimeApi } from "../features/Overtime/OvertimeApi";
import { payrollApi } from "../features/Payroll/PayrollApi";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath ]: employeeApi.reducer,
        [attendanceApi.reducerPath ]: attendanceApi.reducer,
        [scheduleApi.reducerPath ]: scheduleApi.reducer,
        [overtimeApi.reducerPath ]: overtimeApi.reducer,
        [payrollApi.reducerPath ]: payrollApi.reducer,
  
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        employeeApi.middleware,
        attendanceApi.middleware,
        scheduleApi.middleware,
        overtimeApi.middleware,
        payrollApi.middleware,
       
    ),


})

setupListeners(store.dispatch);