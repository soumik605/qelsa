// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store"; // adjust path to your store
import { User } from "@/types/user";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "logged_out";
  lastMessage?: string | null;
}

const initialState: AuthState = {
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  refreshToken: typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  user: null,
  status: "idle",
  lastMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; user?: User | null }>
    ) {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (user) state.user = user;
      state.status = "authenticated";
      state.lastMessage = null;

      // persist
      try {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } catch (e) {
        // ignore storage errors; still keep in memory
      }
    },

    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    logOut(state, action: PayloadAction<{ message?: string | null } | undefined>) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.status = "logged_out";
      state.lastMessage = action?.payload?.message || null;
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } catch (e) {}
    },

    setStatus(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
    },

    setLastMessage(state, action: PayloadAction<string | null>) {
      state.lastMessage = action.payload;
    },
  },
});

export const { setCredentials, logOut, updateUser, setStatus, setLastMessage } = authSlice.actions;

export default authSlice.reducer;

// selectors
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthMessage = (state: RootState) => state.auth.lastMessage;
