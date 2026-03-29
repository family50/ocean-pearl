import React from 'react';
import { LoadingContext } from './LoadingContext';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

export const LoadingProvider: React.FC<Props> = ({ children, isLoading }) => {
  // الجاهزية هي عكس حالة التحميل
  const isReady = !isLoading;

  return (
    <LoadingContext.Provider value={{ isReady }}>
      {children}
    </LoadingContext.Provider>
  );
};