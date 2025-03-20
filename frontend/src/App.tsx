import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query"; // ✅ Import QueryClientProvider
import { queryClient } from "./api/queryClient"; // ✅ Import Query Client
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import TestimonialPage from "./pages/Testimonial";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { AdminProvider } from "./context/AdminProvider";
import { ToastProvider } from "./context/ToastProvider";
import Toast from "./components/Toast";

// ✅ Admin Pages
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Testimonials from "./pages/admin/Testimonials";
import Subscribers from "./pages/admin/Subscribers";
import ContactMessages from "./pages/admin/ContactMessages";

// ✅ Services Pages
import WebDevelopmentPage from "./pages/WebDevelopmentPage";
import AppDevelopmentPage from "./pages/AppDevelopmentPage";
import FacebookAdsPage from "./pages/FacebookAdsPage";
import EmailMarketingPage from "./pages/EmailMarketingService";
import GoogleAdsPage from "./pages/GoogleAdsService";
import MpesaIntegrationPage from "./pages/MpesaService";
import SeoPage from "./pages/SeoPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* ✅ Wrap App with QueryClientProvider */}
      <Router>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* ✅ Public Pages */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <About />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/testimonials"
                element={
                  <>
                    <Navbar />
                    <TestimonialPage />
                    <Footer />
                  </>
                }
              />

              {/* ✅ Services Pages */}
              <Route
                path="/services/web-development"
                element={
                  <>
                    <Navbar />
                    <WebDevelopmentPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services/app-development"
                element={
                  <>
                    <Navbar />
                    <AppDevelopmentPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services/facebook-ads"
                element={
                  <>
                    <Navbar />
                    <FacebookAdsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services/seo"
                element={
                  <>
                    <Navbar />
                    <SeoPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/services/google-ads"
                element={
                  <>
                    <Navbar />
                    <GoogleAdsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services/mpesa-integration"
                element={
                  <>
                    <Navbar />
                    <MpesaIntegrationPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services/email-marketing"
                element={
                  <>
                    <Navbar />
                    <EmailMarketingPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <NotFound />
                    <Footer />
                  </>
                }
              />

              {/* ✅ Auth Pages (No Navbar & Footer) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Route>

              {/* ✅ Protected Routes (For Regular Users) */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={
                    <>
                      <Navbar />
                      <Dashboard />
                      <Footer />
                    </>
                  }
                />
              </Route>

              {/* ✅ Admin Routes (Protected) */}
              <Route element={<ProtectedRoute adminOnly />}>
                <Route
                  path="/admin/*"
                  element={
                    <AdminProvider>
                      <AdminLayout />
                    </AdminProvider>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="subscribers" element={<Subscribers />} />
                  <Route
                    path="contact-messages"
                    element={<ContactMessages />}
                  />
                </Route>
              </Route>
            </Routes>

            {/* ✅ Global Toast Notifications */}
            <Toast />
          </ToastProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
