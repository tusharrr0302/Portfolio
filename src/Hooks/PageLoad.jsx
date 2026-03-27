import { useState, useCallback } from "react";
export const usePageLoad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);
  return { isLoading, finishLoading };
};