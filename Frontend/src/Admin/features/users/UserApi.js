
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
            query: (EmployeeID) =>({
                url: `users/getUserByID/${EmployeeID}`,
                method: "GET",
            }),
            providesTags: ["Employees"]
        }),
        getForgotByEmail: builder.query({            
            query: (Email) =>({
                url: `/users/getNotFoundByEmail/${Email}`,
                method: "GET",
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
                url:"users/addNewEmployee",
                method: "POST",
                body: employee,
            }),
            invalidatesTags: ["Employees"],
        }),

        updateEmployee: builder.mutation({
            query: (employee) =>({
                url:`users/UpdateEmployeeByID/${employee.EmployeeID}`,
                method: "PUT",
                body: employee,
            }),
            invalidatesTags: ["Employees"],
        }),

        upload: builder.mutation({
            query: (file) =>({
                url:"upload-user-profile",
                method: "POST",
                body: file,
            }),
            invalidatesTags: ["Employees"],
        }),

        deleteEmployee: builder.mutation({
            query:(EmployeeID) => ({
                url:`users/deleteEmployeeById/${EmployeeID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employees"],
        })       


    })
});

export const {useGetEmployeesQuery, useLoginEmployeeMutation, 
    useAddEmployeeMutation, useDeleteEmployeeMutation,
     useGetEmployeeByIDQuery, useUpdateEmployeeMutation,
    useGetForgotByEmailQuery, useUploadMutation} = employeeApi;