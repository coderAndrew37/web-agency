// app.tsx
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";
import Toast from "./components/Toast";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { FullPageSkeleton } from "./components/FullPageSkeleton";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<FullPageSkeleton />}>
              <AppRoutes />
              <Toast />
            </Suspense>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
