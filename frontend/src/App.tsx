import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./api/queryClient";
import AppRoutes from "./AppRoutes";
import { FullPageSkeleton } from "./components/FullPageSkeleton";
import Toast from "./components/Toast";
import { useAutoRefresh } from "./hooks/auth/useAutoRefresh";
import { useSessionInitialize } from "./hooks/auth/useSessionInitialize";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  useSessionInitialize(); // Checks auth on mount
  useAutoRefresh(); // Sets up token refresh
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppInitializer>
          <Suspense fallback={<FullPageSkeleton />}>
            <AppRoutes />
            <Toast /> {/* No provider needed */}
          </Suspense>
        </AppInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
