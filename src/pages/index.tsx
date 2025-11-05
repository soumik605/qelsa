"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OnboardingFlow } from "../components/OnboardingFlow";

import Layout from "../layout";
import { SocialFeed } from "../components/SocialFeed";
import { MySpacePage } from "../components/MySpacePage";

interface ResponseData {
  id: string;
  title: string;
  description: string;
  relevance: string;
  actionLabel: string;
  actionType: "view" | "learn" | "apply";
  category: "student" | "professional" | "job" | "skill";
  source?: {
    platform: "Qelsa" | "LinkedIn" | "Indeed" | "Naukri" | "AngelList" | "Glassdoor";
    verified?: boolean;
    exclusive?: boolean;
  };
  jobDetails?: {
    company: string;
    location: string;
    salary?: string;
    workType?: string;
    experience: string;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
  };
}

interface UserData {
  fullName: string;
  username: string;
  profileType: "student" | "professional" | "career-switcher";
  goals: string[];
}

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("qelsa-onboarding-completed");
    const storedUserData = localStorage.getItem("qelsa-user-data");

    if (hasCompletedOnboarding && storedUserData) {
      setIsFirstTimeUser(false);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleOnboardingComplete = useCallback((userData: UserData) => {
    localStorage.setItem("qelsa-onboarding-completed", "true");
    localStorage.setItem("qelsa-user-data", JSON.stringify(userData));

    setUserData(userData);
    setIsFirstTimeUser(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }
    };
  }, []);

  // Show onboarding for first-time users
  if (isFirstTimeUser) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <Layout activeSection={"profile"}><MySpacePage /></Layout>;
}
