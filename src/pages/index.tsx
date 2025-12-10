"use client";

import { useEffect, useRef, useState } from "react";
import { OnboardingFlow } from "../components/OnboardingFlow";

import { useAuth } from "@/contexts/AuthContext";
import { Provider } from "react-redux";
import { MySpacePage } from "../components/MySpacePage";
import Layout from "../layout";
import { store } from "../store";

export default function App() {
  const { user } = useAuth();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      setIsFirstTimeUser(!user.username || user.username.trim() === "" || (!user.find_job && !user.explore_career && !user.upskill_and_learn && !user.prepare_interview));
    }
  }, [user]);

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
    return (
      <Provider store={store}>
        <OnboardingFlow />;
      </Provider>
    );
  }

  return (
    <Layout activeSection={"profile"}>
      <MySpacePage />
    </Layout>
  );
}
