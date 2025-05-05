import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConditionalRoute from "./components/ConditionalRoute";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TestimonialPage = lazy(() => import("./pages/Testimonial"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Users = lazy(() => import("./pages/admin/Users"));
const Testimonials = lazy(() => import("./pages/admin/Testimonials"));
const Subscribers = lazy(() => import("./pages/admin/Subscribers"));
const ContactMessages = lazy(() => import("./pages/admin/ContactMessages"));
const WebDevelopmentPage = lazy(() => import("./pages/WebDevelopmentPage"));
const AppDevelopmentPage = lazy(() => import("./pages/AppDevelopmentPage"));
const FacebookAdsPage = lazy(() => import("./pages/FacebookAdsPage"));
const EmailMarketingPage = lazy(() => import("./pages/EmailMarketingService"));
const GoogleAdsPage = lazy(() => import("./pages/GoogleAdsService"));
const MpesaIntegrationPage = lazy(() => import("./pages/MpesaService"));
const SeoPage = lazy(() => import("./pages/SeoPage"));
const WebsiteTypeDetail = lazy(() => import("./pages/WebsiteDetail"));

const RouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <Suspense fallback={<LoadingSpinner fullPage />}>{children}</Suspense>
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <RouteWrapper>
            <Home />
          </RouteWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <RouteWrapper>
            <About />
          </RouteWrapper>
        }
      />
      <Route
        path="/contact"
        element={
          <RouteWrapper>
            <Contact />
          </RouteWrapper>
        }
      />
      <Route
        path="/testimonials"
        element={
          <RouteWrapper>
            <TestimonialPage />
          </RouteWrapper>
        }
      />

      {/* Services Pages */}
      <Route
        path="/services/web-development"
        element={
          <RouteWrapper>
            <WebDevelopmentPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/app-development"
        element={
          <RouteWrapper>
            <AppDevelopmentPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/facebook-ads"
        element={
          <RouteWrapper>
            <FacebookAdsPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/seo"
        element={
          <RouteWrapper>
            <SeoPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/google-ads"
        element={
          <RouteWrapper>
            <GoogleAdsPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/mpesa-integration"
        element={
          <RouteWrapper>
            <MpesaIntegrationPage />
          </RouteWrapper>
        }
      />
      <Route
        path="/services/email-marketing"
        element={
          <RouteWrapper>
            <EmailMarketingPage />
          </RouteWrapper>
        }
      />

      <Route
        path="/websites/:slug"
        element={
          <RouteWrapper>
            <WebsiteTypeDetail />
          </RouteWrapper>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <RouteWrapper>
            <NotFound />
          </RouteWrapper>
        }
      />

      {/* Auth Pages (No Navbar & Footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes (For Regular Users) */}
      <Route element={<ConditionalRoute required />}>
        <Route
          path="/dashboard"
          element={
            <RouteWrapper>
              <Dashboard />
            </RouteWrapper>
          }
        />
      </Route>

      {/* Admin Routes (Protected) */}
      <Route element={<ConditionalRoute required adminOnly />}>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="contact-messages" element={<ContactMessages />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
// This code defines the routing structure for a React application using React Router. It includes public pages, services pages, authentication pages, and protected routes for both regular users and admin users. The routes are lazy-loaded for better performance, and a loading spinner is displayed while the components are being loaded. The Navbar and Footer components are included in the public and protected routes but not in the authentication pages.
