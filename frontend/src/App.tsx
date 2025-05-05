import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { BrowserRouter, useLocation, matchPath } from "react-router-dom";
import { queryClient } from "./api/queryClient";
import AppRoutes from "./AppRoutes";
import { FullPageSkeleton } from "./components/FullPageSkeleton";
import Toast from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAutoRefresh } from "./hooks/auth/useAutoRefresh";
import { useAuthStore } from "./store/authStore";
import { PUBLIC_ROUTES } from "./routes/publicRoutes";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const hasCheckedAuth = useAuthStore((s) => s.hasCheckedAuth);

  useAutoRefresh();

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  useEffect(() => {
    if (!hasCheckedAuth && !isPublicRoute) {
      checkAuth();
    }
  }, [hasCheckedAuth, checkAuth, isPublicRoute]);

  if (!hasCheckedAuth && !isPublicRoute) {
    return <FullPageSkeleton />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <AppInitializer>
            <Suspense fallback={<FullPageSkeleton />}>
              <AppRoutes />
              <Toast />
            </Suspense>
          </AppInitializer>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
