"use client";

import { useCallback, useState } from "react";
import { JobFilterSidebar } from "../components/JobFilterSidebar";
import { MainNavigation } from "../components/MainNavigation";
import { ProfileDrawer } from "../components/ProfileDrawer";

const Layout = ({ activeSection, children }) => {
  const [showQelsaNavigation, setShowQelsaNavigation] = useState(false);
  const [showJobFilterSidebar, setShowJobFilterSidebar] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  const handleProfileClick = useCallback(() => {
    setShowProfileDrawer(true);
  }, []);

  const handleCloseProfileDrawer = useCallback(() => {
    setShowProfileDrawer(false);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Simplified background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background">
        {/* Subtle animated elements - reduced complexity */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/3 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/3 rounded-full blur-2xl opacity-50"></div>
      </div>

      {/* Conditional navigation rendering */}
      {activeSection !== "qelsa-ai" && (
        <div
          className={`${
            activeSection === "qelsa-ai" ? `lg:hidden fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${showQelsaNavigation ? "translate-y-0" : "-translate-y-full"}` : ""
          }`}
        >
          <MainNavigation activeSection={activeSection} />
        </div>
      )}

      {/* Qelsa AI Navigation Bar for Desktop */}
      {activeSection === "qelsa-ai" && (
        <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 glass-strong border-b border-glass-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Empty left side for future navigation items if needed */}
              <div></div>

              {/* Centered Qelsa Logo */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl gradient-animated flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <span className="text-black font-bold text-lg">Q</span>
                  </div>
                  <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple opacity-50 blur-md group-hover:opacity-70 transition-opacity"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Qelsa</h1>
                  <span className="text-xs text-muted-foreground -mt-1">AI Assistant</span>
                </div>
              </div>

              {/* Empty right side for balance */}
              <div></div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with conditional spacing */}
      {/* <div className={activeSection === "qelsa-ai" ? "lg:pt-20" : "pb-20 lg:pb-0"}>{renderCurrentSection()}</div> */}

      {children}

      {/* Job Filter Sidebar */}
      <JobFilterSidebar isOpen={showJobFilterSidebar} />

      {/* Profile Drawer */}
      <ProfileDrawer isOpen={showProfileDrawer} onClose={handleCloseProfileDrawer} />
    </div>
  );
};

export default Layout;
