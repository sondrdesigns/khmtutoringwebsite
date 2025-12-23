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

    // Base LocalBusiness schema with enhanced information
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${baseUrl}#organization`,
      "name": "KHM Tutoring",
      "alternateName": "KHM Tutoring Hawaii",
      "description": "Expert K-12 tutoring services in Hawaii specializing in Math, English, SAT, SSAT, and AP prep with personalized learning plans and proven results. Serving Honolulu, Oahu, and all of Hawaii.",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/khm-tutoring-logo.png`,
        "width": 300,
        "height": 300
      },
      "image": {
        "@type": "ImageObject",
        "url": `${baseUrl}/og-image.jpg`,
        "width": 1200,
        "height": 630
      },
      "telephone": "+1-808-381-7856",
      "email": "khmtutoring1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Honolulu",
        "addressLocality": "Honolulu",
        "addressRegion": "HI",
        "postalCode": "96815",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.3099",
        "longitude": "-157.8581"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Honolulu"
        },
        {
          "@type": "City",
          "name": "Oahu"
        },
        {
          "@type": "State",
          "name": "Hawaii"
        }
      ],
      "priceRange": "$$",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "KHM Tutoring"
      },
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
        "name": "K-12 Tutoring Services in Hawaii",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "K-12 Tutoring",
              "description": "Comprehensive support across all grade levels from elementary to high school",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              },
              "areaServed": {
                "@type": "State",
                "name": "Hawaii"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mathematics Tutoring",
              "description": "From basic arithmetic to advanced calculus and statistics",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "English Tutoring",
              "description": "Reading comprehension, writing skills, and language arts excellence",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SAT Prep",
              "description": "Comprehensive SAT test preparation with proven strategies and practice tests",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SSAT Prep",
              "description": "Secondary School Admission Test preparation for private school admissions",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AP Subject Tutoring",
              "description": "Advanced Placement exam preparation across multiple subjects",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "KHM Tutoring"
              }
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
        "description": "Expert K-12 tutoring services in Hawaii",
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "KHM Tutoring",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/khm-tutoring-logo.png`
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      });
      
      // Add Organization schema for better recognition
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KHM Tutoring",
        "url": baseUrl,
        "logo": `${baseUrl}/khm-tutoring-logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-808-381-7856",
          "contactType": "Customer Service",
          "email": "khmtutoring1@gmail.com",
          "areaServed": "US-HI",
          "availableLanguage": "English"
        }
      });
    }

    if (type === "contact") {
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact KHM Tutoring",
        "url": `${baseUrl}/contact`,
        "description": "Contact KHM Tutoring to schedule your free consultation for expert K-12 tutoring services in Hawaii",
        "mainEntity": {
          "@type": "EducationalOrganization",
          "name": "KHM Tutoring",
          "email": "khmtutoring1@gmail.com",
          "telephone": "+1-808-381-7856",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Honolulu",
            "addressRegion": "HI",
            "addressCountry": "US"
          }
        }
      });
    }
    
    if (type === "educators") {
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Meet Our Expert Tutors",
        "url": `${baseUrl}/educators`,
        "description": "Meet our team of certified, experienced educators specializing in Math, English, SAT, SSAT, and AP prep in Hawaii"
      });
    }
    
    if (type === "about") {
      additionalSchemas.push({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About KHM Tutoring",
        "url": `${baseUrl}/about`,
        "description": "Learn about KHM Tutoring's mission to empower students through personalized education in Hawaii since 2010"
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

