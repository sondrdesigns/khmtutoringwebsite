import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface StructuredDataProps {
  type?: "home" | "about" | "educators" | "contact";
}

export const StructuredData = ({ type = "home" }: StructuredDataProps) => {
  const location = useLocation();
  const baseUrl = "https://www.khmtutoring.com";

  useEffect(() => {
    // Remove existing structured data script
    const existingScript = document.getElementById("structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    // Base LocalBusiness schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${baseUrl}#organization`,
      "name": "KHM Tutoring",
      "alternateName": "KHM Tutoring Hawaii",
      "description": "Expert K-12 tutoring services in Hawaii and Honolulu. Specializing in Math, English, SAT, SSAT, and AP prep with personalized learning plans.",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "image": `${baseUrl}/og-image.jpg`,
      "telephone": "+1-808-XXX-XXXX",
      "email": "khmtutoring1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Honolulu",
        "addressRegion": "HI",
        "addressCountry": "US",
        "addressArea": "Oahu"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.3099",
        "longitude": "-157.8581"
      },
      "areaServed": {
        "@type": "City",
        "name": "Honolulu"
      },
      "serviceArea": {
        "@type": "State",
        "name": "Hawaii"
      },
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "15:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "22:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tutoring Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "K-12 Tutoring",
              "description": "Comprehensive support across all grade levels"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mathematics Tutoring",
              "description": "From basic arithmetic to advanced calculus"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "English Tutoring",
              "description": "Reading, writing, and language arts excellence"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SAT Prep",
              "description": "Comprehensive SAT test preparation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SSAT Prep",
              "description": "Secondary School Admission Test prep"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AP Subject Tutoring",
              "description": "Advanced Placement exam preparation"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.instagram.com/khmtutoring",
        "https://www.facebook.com/khmtutoring",
        "https://www.yelp.com/biz/khm-tutoring"
      ]
    };

    // Add page-specific schemas
    let additionalSchemas: any[] = [];

    if (type === "home") {
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KHM Tutoring",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      });
    }

    if (type === "contact") {
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact KHM Tutoring",
        "url": `${baseUrl}/contact`,
        "mainEntity": {
          "@type": "EducationalOrganization",
          "name": "KHM Tutoring",
          "email": "khmtutoring1@gmail.com"
        }
      });
    }

    // Combine all schemas
    const allSchemas = [localBusinessSchema, ...additionalSchemas];

    // Create and append script tag
    const script = document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, location.pathname]);

  return null;
};

