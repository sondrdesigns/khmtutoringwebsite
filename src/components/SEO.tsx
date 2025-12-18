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
  title = "KHM Tutoring - Expert K-12 Tutors | Math, English & Test Prep in Hawaii",
  description = "Top-rated K-12 tutoring services with expert educators specializing in Math, English, SAT, SSAT, and AP prep. Personalized learning plans and flexible scheduling.",
  keywords = "K-12 tutoring, math tutor, English tutor, SAT prep, SSAT prep, AP tutoring, test preparation, personalized tutoring, in-home tutoring, online tutoring",
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

