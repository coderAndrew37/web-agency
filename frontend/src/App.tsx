import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AdminProvider } from "./context/AdminProvider"; // ✅ Admin Context

import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout"; // ✅ Import Admin Layout
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Testimonials from "./pages/admin/Testimonials";
import Subscribers from "./pages/admin/Subscribers";
import ContactMessages from "./pages/Contact";
import WebDevelopmentPage from "./pages/WebDevelopmentPage";

import { ToastProvider } from "./context/ToastProvider";
import Toast from "./components/Toast";
import AppDevelopmentPage from "./pages/AppDevelopmentPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* ✅ Public Pages (With Navbar & Footer) */}
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
            <Route
              path="/services/web-development" // Add the new route for Web Development
              element={
                <>
                  <Navbar />
                  <WebDevelopmentPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/services/app-development" // Add the new route for app Development
              element={
                <>
                  <Navbar />
                  <AppDevelopmentPage />
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

            {/* ✅ Admin Routes (Protected & Uses AdminLayout) */}
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
                <Route path="contact-messages" element={<ContactMessages />} />
              </Route>
            </Route>
          </Routes>
          <Toast />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
