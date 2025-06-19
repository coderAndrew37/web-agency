import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./pages/Pricing";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import CaseStudies from "./pages/CaseStudies";
import FreeResources from "./pages/FreeResources";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Pricing />
                <Testimonials />
              </>
            }
          />
          <Route path="/free-resources" element={<FreeResources />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
