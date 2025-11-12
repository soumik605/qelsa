import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "./features/api/jobsApi";
import { authApi } from "./features/api/authApi";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobsApi.middleware).concat(authApi.middleware),
});
