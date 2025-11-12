// features/api/jobsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job } from "../../types/job";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getJobs: builder.query<{ success: boolean; data: Job[] }, { location?: string; company?: string; type?: string; search?: string; page?: number; limit?: number } | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.location) params.append("location", filters.location);
        // if (filters?.company) params.append("company", filters.company);
        // if (filters?.type) params.append("type", filters.type);
        if (filters?.search) params.append("search", filters.search);
        // if (filters?.page) params.append("page", filters.page.toString());
        // if (filters?.limit) params.append("limit", filters.limit.toString());

        return `jobs?${params.toString()}`;
      },
    }),

    getJobById: builder.query<Job, string>({
      query: (id) => `jobs/${id}`,
      transformResponse: (response: { success: boolean; data: Job }) => response.data,
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
