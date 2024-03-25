import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const advancecashApi = createApi({
    reducerPath: "advancecashApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["AdvanceCash"],
    endpoints: (builder) =>({
        getAllAdvanceCash: builder.query({
            query: () => ({
                url: "AdvanceCash/getAll",
                method: "GET",
            }) ,  
            providesTags: ["AdvanceCash"]
                       
        }),

        getAdvanceCashByID: builder.query({          
            query: (AdvanceCashID) =>({
                url: `AdvanceCash/getAdvanceCashByIDD/${AdvanceCashID}`,
                method: "GET",
            }),
            providesTags: ["AdvanceCash"]
        }),
       

        addAdvanceCash: builder.mutation({
            query: (advanceCash) =>({
                url:"AdvanceCash/addAdvanceCash",
                method: "POST",
                body: advanceCash,
            }),
            invalidatesTags: ["AdvanceCash"],
        }),

        // updateAttendance: builder.mutation({
        //     query: ({AdvanceCashID, attendance}) =>({
        //         url:`attendance/UpdateAttendanceByID/${AdvanceCashID}`,
        //         method: "PUT",
        //         body: attendance,
        //     }),
        //     invalidatesTags: ["AdvanceCash"],
        // }),


        deleteAdvanceCash: builder.mutation({
            query:(AdvanceCashID) => ({
                url:`AdvanceCash/deleteAdvanceCashByID/${AdvanceCashID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AdvanceCash"],
        })

        


    })
})


export const {useAddAdvanceCashMutation, useDeleteAdvanceCashMutation,useGetAdvanceCashByIDQuery, useGetAllAdvanceCashQuery } = advancecashApi;