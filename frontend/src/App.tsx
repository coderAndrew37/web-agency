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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* ✅ Protected Routes (For Logged-In Users) */}
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
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
