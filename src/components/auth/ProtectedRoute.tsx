"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../features/api/authApi";

const publicRoutes = ["/login", "/register", "/jobs/smart_matches"];

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [isClient, setIsClient] = useState(false);

  // Only call profile API if token exists
  const {
    data: user,
    error,
    isFetching,
  } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    setIsClient(true);
    if (isFetching) return;

    // Case 1: no token, and not public route → redirect to /jobs
    if (!token && !publicRoutes.includes(router.pathname)) {
      router.replace("/jobs/smart_matches");
      return;
    }

    // Case 2: invalid token (401 or failed profile fetch)
    if (error && !publicRoutes.includes(router.pathname)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/jobs/smart_matches");
      return;
    }

    // Case 3: logged in (user fetched successfully) but trying to visit login/register
    if (user && ["/login", "/register"].includes(router.pathname)) {
      router.replace("/");
      return;
    }
  }, [token, user, error, isFetching, router.pathname]);

  if (!isClient) {
    // ✅ Prevent SSR/client mismatch by rendering nothing until hydrated
    return null;
  }

  // Show loader until we know whether user is valid
  if (isFetching) return <div>Loading...</div>;

  return children;
}
