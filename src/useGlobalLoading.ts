// useGlobalLoading.ts
import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within a LoadingProvider');
  }
  return context;
};