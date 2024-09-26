import { baseAPI } from "@/redux/api/baseApi";
import { StatisticsData } from "@/types/statistics.api";


const statisticsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    getAllStatistics: builder.query<any, null>({
      query: ()=>({
        url: `/statistics/admin`,
        method: "GET",
      }),
    }),
    getStatisticsForAUser: builder.query<string, any>({
      query: (id)=>({
        url: `/statistics/user/${id}`,
        method: "GET",
      }),
    }),
  }
)
});

export const { useGetAllStatisticsQuery, useGetStatisticsForAUserQuery} = statisticsApi;