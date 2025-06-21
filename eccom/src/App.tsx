import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import WhatsAppCTA from "./components/WhatsapCta";

// src/components/loaders/EcomCartLoader.tsx
const EcomCartLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="flex items-center space-x-3 animate-pulse">
      <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce delay-100" />
      <div className="w-10 h-2 bg-blue-600 rounded-sm animate-bounce delay-200" />
      <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce delay-300" />
      <svg
        className="w-8 h-8 text-blue-600 animate-spin-slow ml-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 5.39A1 1 0 007.61 20h8.78a1 1 0 00.97-.76L19 13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<EcomCartLoader />}>
          <AppRoutes />
        </Suspense>
        <WhatsAppCTA />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
