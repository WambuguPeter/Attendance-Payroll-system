
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const payrollApi = createApi({
    reducerPath: "payrollApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Payrolls"],
    endpoints: (builder) =>({
        getPayrolls: builder.query({
            query: () => ({
                url: "payroll/getAll",
                method: "GET",
            }) ,  
            providesTags: ["Payrolls"]
            
            
        }),
        getPayrollsByID: builder.query({
            //by id???
            query: (PayrollID) =>({
                url: `payroll/getpayrollByID/${PayrollID}`,
                method: "GET",
            }),
            providesTags: ["Payrolls"]
        }),

        getPayrollsByEmpID: builder.query({
            //by id???
            query: (EmployeeID) =>({
                url: `payroll/getpayrollByEmpID/${EmployeeID}`,
                method: "GET",
            }),
            providesTags: ["Payrolls"]
        }),

        addPayroll: builder.mutation({
            query: (payroll) =>({
                url:"payroll/addpayroll",
                method: "POST",
                body: payroll,
            }),
            invalidatesTags: ["Payrolls"],
        }),

        // updatePayrolls: builder.mutation({
        //     query: (ScheduleID) =>({
        //         url:`Payrolls/updateScheduleByID/${ScheduleID}`,
        //         method: "PUT",
        //     }),
        //     invalidatesTags: ["Payrolls"],
        // }),


        deletePayrolls: builder.mutation({
            query:(PayrollID) => ({
                url:`payroll/deletepayrollByID/${PayrollID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Payrolls"],
        })       


    })
});

export const {useGetPayrollsQuery, useGetPayrollsByIDQuery, useAddPayrollMutation, useDeletePayrollsMutation} = payrollApi;