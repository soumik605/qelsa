import { useState, useEffect } from 'react';
import { ModernAIChatInterface } from './ModernAIChatInterface';

interface QelsaAIPageProps {
  onViewAllJobs: (searchQuery: string) => void;
  onNavigateToProfile?: () => void;
  onProfileClick?: () => void;
}

export function QelsaAIPage({ onViewAllJobs, onNavigateToProfile, onProfileClick }: QelsaAIPageProps) {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Get user name from localStorage
    const storedUserData = localStorage.getItem('qelsa-user-data');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserName(userData.fullName || 'User');
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden">
      <ModernAIChatInterface 
        userName={userName}
        onViewAllJobs={onViewAllJobs}
      />
    </div>
  );
}
