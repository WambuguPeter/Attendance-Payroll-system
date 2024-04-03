import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const positionApi = createApi ({
    reducerPath: "positionApi",
    baseQuery: fetchBaseQuery({baseUrl:  "http://localhost:8000/api/"}),
    tagTypes:["Positions"],
    endpoints: (builder) =>({
        getPositions: builder.query({
            query: () =>({
                url: "Positions/getAll",
                method: "GET",
            }),
            providesTags: ["Positions"]
        }),
    }),
});

export const {useGetPositionsQuery} = positionApi