import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { testimonials } from "../data/testimonials";

const Hero = lazy(() => import("../components/Hero"));
const Services = lazy(() => import("../components/Services"));
const FeaturesGrid = lazy(() => import("../components/FeaturesGrid"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const PricingSection = lazy(() => import("../components/PricingSection"));
const WebsiteInAWeek = lazy(() => import("../components/WebsiteInAWeek"));
const ThisSoundFamiliar = lazy(
  () => import("../components/ThisSoundsFamiliar")
);

const FreeResources = lazy(() => import("../pages/FreeResources"));
const CaseStudies = lazy(() => import("../pages/CaseStudies"));
const Contact = lazy(() => import("../pages/Contact"));
const Pricing = lazy(() => import("../pages/Pricing"));
const WhyUs = lazy(() => import("../pages/WhyUs"));
const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const WebsiteInAWeekPage = lazy(() => import("../pages/WebsiteInAWeekPage"));
const BlogListPage = lazy(() => import("../pages/BlogList"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Accessibility = lazy(() => import("../pages/Accessibilty"));
const Sitemap = lazy(() => import("../pages/Sitemap"));
const NotFound = lazy(() => import("../pages/404"));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <Hero />
          <Services />
          <FeaturesGrid />
          <Testimonials
            testimonials={testimonials}
            title="What Our Clients Say"
            subtitle="Testimonials"
          />
          <PricingSection />
          <WebsiteInAWeek />
          <ThisSoundFamiliar />
        </>
      }
    />
    <Route path="/free-resources" element={<FreeResources />} />
    <Route path="/case-studies" element={<CaseStudies />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/why-us" element={<WhyUs />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/website-in-a-week" element={<WebsiteInAWeekPage />} />
    <Route path="/blog-posts" element={<BlogListPage />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/accessibility" element={<Accessibility />} />
    <Route path="/sitemap" element={<Sitemap />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
