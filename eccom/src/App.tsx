import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const DumbbellLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-bounce text-blue-600 text-4xl font-bold flex items-center space-x-2">
      <span className="inline-block w-6 h-6 bg-blue-600 rounded-full animate-pulse"></span>
      <span className="inline-block w-10 h-2 bg-blue-600 rounded-sm"></span>
      <span className="inline-block w-6 h-6 bg-blue-600 rounded-full animate-pulse"></span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<DumbbellLoader />}>
          <AppRoutes />
        </Suspense>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
