
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Schedules"],
    endpoints: (builder) =>({
        getSchedules: builder.query({
            query: () => ({
                url: "Schedules/getAll",
                method: "GET",
            }) ,  
            providesTags: ["Schedules"]
            
            
        }),
        getSchedulesByID: builder.query({
            //by id???
            query: (ScheduleID) =>({
                url: `Schedules/getScheduleByID/${ScheduleID}`,
                method: "GET",
            }),
            providesTags: ["Schedules"]
        }),

        addSchedule: builder.mutation({
            query: (schedule) =>({
                url:"Schedules/addSchedule",
                method: "POST",
                body: schedule,
            }),
            invalidatesTags: ["Schedules"],
        }),

        updateSchedules: builder.mutation({
            query: (ScheduleID) =>({
                url:`Schedules/updateScheduleByID/${ScheduleID}`,
                method: "PUT",
            }),
            invalidatesTags: ["Schedules"],
        }),


        deleteSchedules: builder.mutation({
            query:(ScheduleID) => ({
                url:`Schedules/deleteSchedule/${ScheduleID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Schedules"],
        })

        


    })
});

export const {useAddScheduleMutation, useDeleteSchedulesMutation, useGetSchedulesByIDQuery,
 useGetSchedulesQuery, useUpdateSchedulesMutation} = scheduleApi;