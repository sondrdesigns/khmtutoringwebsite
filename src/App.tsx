import { lazy, Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { SEO } from "./components/SEO";
import { StructuredData } from "./components/StructuredData";

// Lazy load routes for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Educators = lazy(() => import("./pages/Educators"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  
  // Memoize page type to avoid recalculation
  const pageType = useMemo(() => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/about") return "about";
    if (location.pathname === "/educators") return "educators";
    if (location.pathname === "/contact") return "contact";
    return "home";
  }, [location.pathname]);

  // Memoize SEO data to avoid recalculation on every render
  const seoData = useMemo(() => {
    const baseUrl = "https://www.khmtutoring.com";
    
    switch (location.pathname) {
      case "/":
        return {
          title: "KHM Tutoring - Expert K-12 Tutors | Math, English & Test Prep in Hawaii",
          description: "Top-rated K-12 tutoring services with expert educators specializing in Math, English, SAT, SSAT, and AP prep. Personalized learning plans and flexible scheduling. Book your free consultation today!",
          keywords: "K-12 tutoring, math tutor, English tutor, SAT prep, SSAT prep, AP tutoring, test preparation, personalized tutoring, in-home tutoring, online tutoring, Honolulu, Oahu, Hawaii",
        };
      case "/about":
        return {
          title: "About KHM Tutoring - Premier Tutoring Service Since 2010",
          description: "Learn about KHM Tutoring's mission to empower students through personalized education. Experienced educators, proven results, and a commitment to academic excellence across all grade levels.",
          keywords: "about KHM Tutoring, tutoring company, educational services, tutoring history, tutoring mission, experienced educators, personalized learning",
        };
      case "/educators":
        return {
          title: "Meet Our Expert Tutors | KHM Tutoring",
          description: "Meet our team of certified, experienced educators specializing in Math, English, SAT, SSAT, and AP prep. All tutors are background-checked and dedicated to student success.",
          keywords: "tutors, educators, math tutors, English tutors, SAT tutors, AP tutors, certified tutors, experienced teachers, test prep specialists",
        };
      case "/contact":
        return {
          title: "Contact KHM Tutoring - Book Your Free Consultation",
          description: "Schedule your free consultation today. Flexible scheduling available with in-home or online tutoring options. Get started on your academic journey.",
          keywords: "contact KHM Tutoring, tutoring consultation, book tutor, tutoring inquiry, free consultation, schedule tutoring",
        };
      default:
        return {
          title: "KHM Tutoring - Expert K-12 Tutors",
          description: "Top-rated tutoring services with expert educators.",
          keywords: "tutoring, tutors, K-12 education",
        };
    }
  }, [location.pathname]);

  return (
    <>
      <SEO {...seoData} />
      <StructuredData type={pageType} />
      <LoadingScreen />
      <ScrollToTop />
      <div className="min-h-screen bg-background w-full">
        <Navigation />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/educators" element={<Educators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default App;