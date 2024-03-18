import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Employees"],
    endpoints: (builder) =>({
        getEmployees: builder.query({
            query: () => "users/getAllUsers",
            providesTags: ["Employees"]
        }),
        loginEmployee: builder.mutation({
            query:(employee) => ({
                url: "users/login",
                method: "POST",
                body: employee,
            }),
            invalidatesTags: ["Employees"]
        }),
        addEmployee: builder.mutation({
            query: (employee) =>({
                url:"/users/addNewEmployee",
                method: "POST",
                body: employee,
            }),
            invalidatesTags: ["Employees"],
        }),
        deleteEmployee: builder.mutation({
            query:(EmployeeID) => ({
                url:`/users/deleteEmployeeById/${EmployeeID}`,
                method: "DELETE",
            })
        })
        


    })
});

export const {useGetEmployeesQuery, useLoginEmployeeMutation, useAddEmployeeMutation, useDeleteEmployeeMutation} = employeeApi;