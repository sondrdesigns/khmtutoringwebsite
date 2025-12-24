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
  title = "KHM Tutoring | Expert K-12 Tutors in Hawaii | Math, English & Test Prep",
  description = "Expert K-12 tutoring in Hawaii. Math, English, SAT, SSAT & AP prep. Certified tutors, personalized learning, proven results. Serving Honolulu & Oahu. Free consultation!",
  keywords = "K-12 tutoring, math tutor, English tutor, SAT prep, SSAT prep, AP tutoring, test prep, personalized tutoring, in-home tutoring, online tutoring, Hawaii, Honolulu",
  image = "https://www.khmtutoring.com/og-image.jpg",
  url,
  type = "website",
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://www.khmtutoring.com";
  const currentUrl = url || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Use requestIdleCallback for non-blocking updates, fallback to setTimeout
    const updateMeta = () => {
      // Update document title immediately (critical)
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

      // Batch DOM updates
      updateMetaTag("description", description);
      updateMetaTag("keywords", keywords);
      updateMetaTag("title", title);
      updateMetaTag("og:title", title, true);
      updateMetaTag("og:description", description, true);
      updateMetaTag("og:image", image, true);
      updateMetaTag("og:url", currentUrl, true);
      updateMetaTag("og:type", type, true);
      updateMetaTag("og:site_name", "KHM Tutoring", true);
      updateMetaTag("twitter:card", "summary_large_image");
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
    };

    // Use requestIdleCallback if available, otherwise use setTimeout with 0 delay
    if ('requestIdleCallback' in window) {
      requestIdleCallback(updateMeta, { timeout: 100 });
    } else {
      setTimeout(updateMeta, 0);
    }
  }, [title, description, keywords, image, currentUrl, type]);

  return null;
};

