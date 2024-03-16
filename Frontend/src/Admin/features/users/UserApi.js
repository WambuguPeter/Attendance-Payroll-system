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
        


    })
});

export const {useGetEmployeesQuery, useLoginEmployeeMutation} = employeeApi;