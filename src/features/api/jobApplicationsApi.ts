// features/api/jobApplicationsApi.ts
import { JobApplication } from "@/types/jobApplication";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApplicationsApi = createApi({
  reducerPath: "jobApplicationsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Applications", "Application"],

  endpoints: (builder) => ({
    getJobApplications: builder.query<JobApplication[], { jobId: string; filters?: Record<string, string> }>({
      query: ({ jobId, filters = {} }) => {
        const params = new URLSearchParams(filters);
        return `jobs/${jobId}/applications?${params.toString()}`;
      },

      transformResponse: (response: { success: boolean; data: JobApplication[] }) => {
        return response.data;
      },

      providesTags: ["Applications"],
    }),
    createJobApplication: builder.mutation({
      query: (body) => ({
        url: `jobs/${body.id}/applications`,
        method: "POST",
        body: body.applicationData,
      }),

      // transformResponse: (response: { success: boolean; data: Job }) => response.data,
    }),
  }),
});

export const { useGetJobApplicationsQuery, useCreateJobApplicationMutation } = jobApplicationsApi;
