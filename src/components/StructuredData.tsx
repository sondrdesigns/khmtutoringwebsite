import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface StructuredDataProps {
  type?: "home" | "about" | "educators" | "contact";
}

export const StructuredData = ({ type = "home" }: StructuredDataProps) => {
  const location = useLocation();
  const baseUrl = "https://www.khmtutoring.com";

  useEffect(() => {
    // Use requestIdleCallback for non-blocking structured data updates
    const updateStructuredData = () => {
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
              "alternateName": "math tutor hawaii",
              "description": "From basic arithmetic to advanced calculus and statistics. Expert math tutor hawaii providing personalized instruction",
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
              "alternateName": "SAT tutoring Hawaii",
              "description": "Comprehensive SAT tutoring Hawaii with proven strategies and practice tests. Expert SAT prep services",
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
              "name": "SSAT Prep",
              "alternateName": "SSAT Tutor hawaii",
              "description": "Secondary School Admission Test preparation. Expert SSAT Tutor hawaii for private school admissions",
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

    // Add specific Service schemas for target keywords (hidden from visible content)
    const tutorServices: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "SAT tutoring Hawaii",
        "description": "Expert SAT tutoring Hawaii. Comprehensive SAT prep with personalized instruction and proven strategies",
        "provider": {
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}#organization`,
          "name": "KHM Tutoring"
        },
        "areaServed": {
          "@type": "State",
          "name": "Hawaii"
        },
        "serviceType": "SAT Test Preparation",
        "offers": {
          "@type": "Offer",
          "availabilityStarts": "2010-01-01",
          "priceCurrency": "USD",
          "priceRange": "$$"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "SSAT Tutor hawaii",
        "description": "Expert SSAT Tutor hawaii for Secondary School Admission Test preparation. Specialized SSAT prep services",
        "provider": {
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}#organization`,
          "name": "KHM Tutoring"
        },
        "areaServed": {
          "@type": "State",
          "name": "Hawaii"
        },
        "serviceType": "SSAT Test Preparation",
        "offers": {
          "@type": "Offer",
          "availabilityStarts": "2010-01-01",
          "priceCurrency": "USD",
          "priceRange": "$$"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "math tutor hawaii",
        "description": "Expert math tutor hawaii providing personalized mathematics instruction from basic arithmetic to advanced calculus",
        "provider": {
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}#organization`,
          "name": "KHM Tutoring"
        },
        "areaServed": {
          "@type": "State",
          "name": "Hawaii"
        },
        "serviceType": "Mathematics Tutoring",
        "offers": {
          "@type": "Offer",
          "availabilityStarts": "2010-01-01",
          "priceCurrency": "USD",
          "priceRange": "$$"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "best tutor near me",
        "alternateName": "best tutor near me Hawaii",
        "description": "Best tutor near me Hawaii. Expert tutoring services with personalized instruction and proven results",
        "url": baseUrl,
        "telephone": "+1-808-381-7856",
        "address": {
          "@type": "PostalAddress",
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
        "areaServed": {
          "@type": "State",
          "name": "Hawaii"
        }
      }
    ];

    // Add page-specific schemas
    let additionalSchemas: any[] = tutorServices;

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
        "description": "Learn about KHM Tutoring's mission to empower students through personalized education in Hawaii"
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
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    let idleCallbackId: number | null = null;
    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(updateStructuredData, { timeout: 200 }) as unknown as number;
    } else {
      setTimeout(updateStructuredData, 0);
    }

    return () => {
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleCallbackId);
      }
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, location.pathname]);

  return null;
};

