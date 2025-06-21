import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import BlogListPage from "./pages/BlogList";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import { defaultFaqs } from "./data/DefaultFaqs";
import WhatsAppCTA from "./components/WhtasapCta";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/NavBar"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

const SleekSitesLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="flex items-center space-x-2">
      <div className="text-2xl font-extrabold text-blue-600 animate-[fade-in_1.5s_ease-in-out_infinite_alternate]">
        Sleek
      </div>
      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-[bounce_0.5s_alternate_infinite]"></div>
      <div className="text-2xl font-extrabold text-indigo-700 animate-[fade-in_1.5s_ease-in-out_infinite_alternate]">
        Sites
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<SleekSitesLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog-posts" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/services" element={<Services />} />
        </Routes>
        <FAQ
          title="Frequently Asked Questions"
          subtitle="Everything you might want to know"
          faqs={defaultFaqs}
        />
        <WhatsAppCTA />
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
