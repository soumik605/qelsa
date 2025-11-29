import { User } from "@/types/user";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

// Interfaces
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

// Redirect Helper
const redirectToLogin = (message: string) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  const params = new URLSearchParams({ message });
  window.location.href = `/login?${params.toString()}`;
};

// Raw baseQuery
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/auth",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | { url: string; method?: string; body?: unknown }, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      redirectToLogin("Session expired. Please login again.");
      return result;
    }

    if (typeof args === "string" ? args.includes("/refresh") : args.url.includes("/refresh")) {
      redirectToLogin("Session expired. Please login again.");
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefresh } = refreshResult.data as RefreshResponse;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefresh);

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      redirectToLogin("Session expired. Please login again.");
    }
  }

  return result;
};

// Auth API
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch(authApi.util.invalidateTags(["Profile"]));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    getProfile: builder.query<User, void>({
      query: () => "/me",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (profile) => ({
        url: "/edit-profile",
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useUpdateProfileMutation } = authApi;
