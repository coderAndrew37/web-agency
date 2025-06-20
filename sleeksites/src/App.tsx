import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import BlogListPage from "./pages/BlogList";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/NavBar"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog-posts" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
