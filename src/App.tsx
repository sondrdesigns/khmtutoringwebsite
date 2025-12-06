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
          title: "KHM Tutoring - Expert Tutors in Hawaii & Honolulu | K-12 Math, English & Test Prep",
          description: "Top-rated tutoring services in Hawaii and Honolulu. Expert K-12 tutors for Math, English, SAT, SSAT, and AP prep. Personalized learning, flexible scheduling. Serving Honolulu, Oahu, and all of Hawaii. Book your free consultation today!",
          keywords: "tutors Hawaii, tutors Honolulu, tutoring services Hawaii, K-12 tutoring Honolulu, math tutor Hawaii, English tutor Honolulu, SAT prep Hawaii, SSAT prep Honolulu, AP tutoring Hawaii, private tutor Honolulu, in-home tutoring Hawaii, online tutoring Hawaii, best tutors Honolulu, tutoring near me Hawaii",
        };
      case "/about":
        return {
          title: "About KHM Tutoring - Expert Tutors in Hawaii & Honolulu",
          description: "Learn about KHM Tutoring, Hawaii's premier tutoring service. Experienced educators, personalized learning plans, and proven results. Serving Honolulu, Oahu, and all of Hawaii since 2010.",
          keywords: "about KHM Tutoring, tutoring company Hawaii, educational services Honolulu, tutoring history Hawaii, tutoring mission Honolulu",
        };
      case "/educators":
        return {
          title: "Meet Our Expert Tutors in Hawaii & Honolulu | KHM Tutoring",
          description: "Meet our team of expert tutors in Hawaii and Honolulu. Experienced educators specializing in Math, English, SAT, SSAT, and AP prep. All tutors are certified and background-checked.",
          keywords: "tutors Hawaii, educators Honolulu, math tutors Hawaii, English tutors Honolulu, SAT tutors Hawaii, AP tutors Honolulu, certified tutors Hawaii",
        };
      case "/contact":
        return {
          title: "Contact KHM Tutoring - Book Your Free Consultation in Hawaii",
          description: "Contact KHM Tutoring in Hawaii and Honolulu. Schedule your free consultation today. Flexible scheduling, in-home or online tutoring available. Serving all of Oahu and Hawaii.",
          keywords: "contact KHM Tutoring, tutoring consultation Hawaii, book tutor Honolulu, tutoring inquiry Hawaii, tutoring contact Honolulu",
        };
      default:
        return {
          title: "KHM Tutoring - Expert Tutors in Hawaii & Honolulu",
          description: "Top-rated tutoring services in Hawaii and Honolulu.",
          keywords: "tutors Hawaii, tutors Honolulu",
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