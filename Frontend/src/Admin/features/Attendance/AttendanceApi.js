import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
    reducerPath: "attendanceApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Attendances"],
    endpoints: (builder) =>({
        getAttendances: builder.query({
            query: () => ({
                url: "attendance/getAll",
                method: "GET",
            }) ,  
            providesTags: ["Attendances"]
                       
        }),

        getAttendanceByID: builder.query({          
            query: (EmployeeID) =>({
                url: `attendance/getattendanceByEmpID/${EmployeeID}`,
                method: "GET",
            }),
            providesTags: ["Attendances"]
        }),
       

        addAttendances: builder.mutation({
            query: (attendance) =>({
                url:"attendance/AddAttendance",
                method: "POST",
                body: attendance,
            }),
            invalidatesTags: ["Attendances"],
        }),

        updateAttendance: builder.mutation({
            query: ({AttendanceID, attendance}) =>({
                url:`attendance/UpdateAttendanceByID/${AttendanceID}`,
                method: "PUT",
                body: attendance,
            }),
            invalidatesTags: ["Attendances"],
        }),


        deleteAttendance: builder.mutation({
            query:(AttendanceID) => ({
                url:`attendance/deleteattendanceByID/${AttendanceID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Attendances"],
        })

        


    })
})


export const {useGetAttendancesQuery, useAddAttendancesMutation,
useDeleteAttendanceMutation, useGetAttendanceByIDQuery, useUpdateAttendanceMutation } = attendanceApi;