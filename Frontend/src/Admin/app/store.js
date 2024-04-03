import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/users/UserApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";
import { scheduleApi } from "../features/Schedule/ScheduleApi";
import { overtimeApi } from "../features/Overtime/OvertimeApi";
import { payrollApi } from "../features/Payroll/PayrollApi";
import { advancecashApi } from "../features/AdvanceCash/AdvanceCashApi";
import { positionApi } from "../features/Position/PositionApi";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath ]: employeeApi.reducer,
        [attendanceApi.reducerPath ]: attendanceApi.reducer,
        [scheduleApi.reducerPath ]: scheduleApi.reducer,
        [overtimeApi.reducerPath ]: overtimeApi.reducer,
        [payrollApi.reducerPath ]: payrollApi.reducer,
        [advancecashApi.reducerPath ]: advancecashApi.reducer,
        [positionApi.reducerPath ]: positionApi.reducer,
  
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        employeeApi.middleware,
        attendanceApi.middleware,
        scheduleApi.middleware,
        overtimeApi.middleware,
        payrollApi.middleware,
        advancecashApi.middleware,
        positionApi.middleware,
       
    ),


})

setupListeners(store.dispatch);