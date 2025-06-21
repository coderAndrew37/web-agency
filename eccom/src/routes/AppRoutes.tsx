import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { testimonials } from "../data/testimonials";
import CoreServicePage from "../pages/CoreServicePage";

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
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Accessibility = lazy(() => import("../pages/Accessibilty"));
const Sitemap = lazy(() => import("../pages/Sitemap"));
const NotFound = lazy(() => import("../pages/404"));

import AnimatedSection from "../components/AnimatedSection";
import CaseStudyPage from "../pages/caseStudyPage";
import BlogDetailPage from "../pages/BlogDetailPage";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <AnimatedSection>
            <Hero />
          </AnimatedSection>

          <AnimatedSection>
            <Services />
          </AnimatedSection>

          <AnimatedSection>
            <FeaturesGrid />
          </AnimatedSection>

          <AnimatedSection>
            <Testimonials
              testimonials={testimonials}
              title="What Our Clients Say"
              subtitle="Testimonials"
            />
          </AnimatedSection>

          <AnimatedSection>
            <PricingSection />
          </AnimatedSection>

          <AnimatedSection>
            <WebsiteInAWeek />
          </AnimatedSection>

          <AnimatedSection>
            <ThisSoundFamiliar />
          </AnimatedSection>
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
    <Route path="/blog/:slug" element={<BlogDetailPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/accessibility" element={<Accessibility />} />
    <Route path="/services/:slug" element={<CoreServicePage />} />
    <Route path="/case-studies/:slug" element={<CaseStudyPage />} />

    <Route path="/sitemap" element={<Sitemap />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
