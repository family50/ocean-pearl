import { createContext, useContext } from 'react';

export interface LoadingContextType {
  isReady: boolean;
}

// تعريف المخزن
export const LoadingContext = createContext<LoadingContextType>({ isReady: false });

// تعريف الـ Hook اللي LuxeMedia بتستخدمه
export const useGlobalLoading = () => {
  return useContext(LoadingContext);
};