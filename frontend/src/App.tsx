import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Contact } from "lucide-react";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ClientOnboardingPage from "./pages/ClientOnbording";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar is shared across all pages */}
        <Navbar />

        {/* Routes define which component to render based on the URL */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage */}
          <Route path="/client-onboarding" element={<ClientOnboardingPage />} />
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="*" element={<NotFound />} />{" "}
          {/* 404 page for unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
