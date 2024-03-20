
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const positionApi = createApi({
    reducerPath: "positionApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/"}),
    tagTypes: ["Positions"],
    endpoints: (builder) =>({
        getPositions: builder.query({
            query: () => ({
                url: "Positions/getAll",
                method: "GET",
            }) ,  
            providesTags: ["Positions"]
            
            
        }),
        getPositionsByID: builder.query({
            //by id???
            query: (PositionID) =>({
                url: `Positions/getPositionByID/${PositionID}`,
                method: "GET",
            }),
            providesTags: ["Positions"]
        }),

        addPosition: builder.mutation({
            query: (position) =>({
                url:"Positions/addPosition",
                method: "POST",
                body: position,
            }),
            invalidatesTags: ["Positions"],
        }),

        updatePositions: builder.mutation({
            query: (PositionID) =>({
                url:`Positions/updatePositionByID/${PositionID}`,
                method: "PUT",
            }),
            invalidatesTags: ["Positions"],
        }),


        deletePositions: builder.mutation({
            query:(PositionID) => ({
                url:`Positions/deletePositionByID/${PositionID}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Positions"],
        })       


    })
});

export const {useDeletePositionsMutation, useGetPositionsByIDQuery, useGetPositionsQuery, useUpdatePositionsMutation, useAddPositionMutation} = positionApi;