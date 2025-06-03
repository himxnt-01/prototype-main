// src/hooks/useLocation.ts
import { useNavigate as useRouterNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { useCallback } from 'react';

export function useLocation() {
  const navigate = useRouterNavigate();
  const location = useRouterLocation();

  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return {
    currentPath: location.pathname,
    navigate: navigateTo,
  };
}