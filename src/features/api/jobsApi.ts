import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Job {
  id: string;
  title: string;
  description: string;
  // Add other job fields as needed
}

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // set your base API
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => "jobs",
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => `jobs/${id}`,
    }),
    // Add more endpoints as needed for mutations, etc.
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
