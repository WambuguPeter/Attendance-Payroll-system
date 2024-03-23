
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const overtimeApi = createApi({
    reducerPath: "overtimeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Overtime"],
    endpoints: (builder) =>({
        getOvertime: builder.query({
            query: () => ({
                url: "overtime/getAll",
                method: "GET",
            }) ,  
            providesTags: ["Overtime"]
            
            
        }),
        // getOvertimeByID: builder.query({
        //     //by id???
        //     query: (ScheduleID) =>({
        //         url: `Overtime/getScheduleByID/${ScheduleID}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["Overtime"]
        // }),

        // addSchedule: builder.mutation({
        //     query: (schedule) =>({
        //         url:"Overtime/addSchedule",
        //         method: "POST",
        //         body: schedule,
        //     }),
        //     invalidatesTags: ["Overtime"],
        // }),

    //     updateOvertime: builder.mutation({
    //         query: (ScheduleID) =>({
    //             url:`Overtime/updateScheduleByID/${ScheduleID}`,
    //             method: "PUT",
    //         }),
    //         invalidatesTags: ["Overtime"],
    //     }),


        deleteOvertime: builder.mutation({
            query:(OvertimeID) => ({
                url:`overtime/deleteOvetimeByID/${OvertimeID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Overtime"],
        })       


    })
});

export const { useGetOvertimeQuery, useDeleteOvertimeMutation} = overtimeApi;