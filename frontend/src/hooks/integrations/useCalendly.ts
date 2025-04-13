import { useCallback } from "react";

export const useCalendly = () => {
  const openCalendly = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return { openCalendly };
};
