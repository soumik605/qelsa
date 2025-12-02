"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useGetProfileQuery } from "@/features/api/authApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/login", "/register", "/auth", "/jobs/smart_matches", "/jobs"];
const PUBLIC_DYNAMIC = /^\/jobs\/\d+$/;

export default function RouteGuard({ children }) {
  const router = useRouter();
  const { setUserProfile, logout, isAuthenticated } = useAuth();

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const [isClient, setIsClient] = useState(false);

  const { data: profile, error, isFetching } = useGetProfileQuery(undefined, { skip: !token });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // When profile loads → set user in AuthContext
  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (!isClient || isFetching) return;

    const path = router.pathname;

    const isPublic = PUBLIC_ROUTES.includes(path) || PUBLIC_DYNAMIC.test(path);

    // ⭐ CASE 1 — No token and protected route
    if (!token && !isPublic) {
      router.replace("/jobs");
      return;
    }

    // ⭐ CASE 2 — Token exists but 401 (expired + refresh failed)
    if (error) {
      logout();
      router.replace("/jobs");
      return;
    }

    // ⭐ CASE 3 — Logged in user visiting login/register
    if (profile && ["/login", "/register", "/auth"].includes(path)) {
      router.replace("/jobs/smart_matches");
    }
  }, [token, isClient, isFetching, error, profile, router.pathname]);

  if (!isClient || isFetching) return null;

  return children;
}
