import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authApi";
import { educationsApi } from "./features/api/educationsApi";
import { jobApplicationsApi } from "./features/api/jobApplicationsApi";
import { jobsApi } from "./features/api/jobsApi";
import { pagesApi } from "./features/api/pagesApi";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
    [jobApplicationsApi.reducerPath]: jobApplicationsApi.reducer,
    [educationsApi.reducerPath]: educationsApi.reducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware).concat(authApi.middleware).concat(pagesApi.middleware).concat(jobApplicationsApi.middleware).concat(educationsApi.middleware),
});
