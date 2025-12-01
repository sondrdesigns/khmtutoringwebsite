import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title = "KHM Tutoring - Expert Tutors in Hawaii & Honolulu | K-12 Math, English & Test Prep",
  description = "Top-rated tutoring services in Hawaii and Honolulu. Expert K-12 tutors for Math, English, SAT, SSAT, and AP prep. Personalized learning, flexible scheduling. Serving Honolulu, Oahu, and all of Hawaii.",
  keywords = "tutors Hawaii, tutors Honolulu, tutoring services Hawaii, K-12 tutoring Honolulu, math tutor Hawaii, English tutor Honolulu, SAT prep Hawaii, SSAT prep Honolulu, AP tutoring Hawaii, private tutor Honolulu, in-home tutoring Hawaii, online tutoring Hawaii, best tutors Honolulu, tutoring near me Hawaii",
  image = "https://www.khmtutoring.com/og-image.jpg",
  url,
  type = "website",
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://www.khmtutoring.com";
  const currentUrl = url || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Update canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;
  }, [title, description, keywords, image, currentUrl, type]);

  return null;
};

