import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useProfileNavigation() {
  const navigate = useNavigate();

  const navigateToProfile = useCallback(async () => {
    navigate('/profile');
  }, [navigate]);

  return { navigateToProfile };
} 