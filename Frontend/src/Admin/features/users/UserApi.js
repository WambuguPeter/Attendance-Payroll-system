import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Employees"],
    endpoints: (builder) =>({
        getEmployees: builder.query({
            query: () => ({
                url: "users/getAllUsers",
                method: "GET",
            }) ,  
            providesTags: ["Employees"]
            
            
        }),
        getEmployeeByID: builder.query({
            //by id???
            query: (employee) =>({
                url: "users/getUserByID/4",
                method: "GET",
                body:employee,
            }),
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