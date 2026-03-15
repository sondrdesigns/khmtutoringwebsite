interface StructuredDataProps {
  type: 'organization' | 'home' | 'about' | 'educators' | 'contact';
}

export function StructuredData({ type }: StructuredDataProps) {
  const baseUrl = 'https://www.khmtutoring.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'KHM Tutoring',
    description: 'Expert K-12 tutoring services in Hawaii. Math, English, SAT, SSAT, and AP prep. Serving Honolulu, Oahu, and all of Hawaii.',
    url: baseUrl,
    telephone: '(808) 381-7856',
    email: 'khmtutoring1@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Honolulu',
      addressRegion: 'HI',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Honolulu' },
      { '@type': 'State', name: 'Hawaii' },
    ],
    sameAs: [],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KHM Tutoring',
    description: 'Expert K-12 tutoring services in Hawaii',
    url: baseUrl,
    telephone: '(808) 381-7856',
    email: 'khmtutoring1@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Honolulu',
      addressRegion: 'HI',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    priceRange: '$$',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tutoring Services',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'KHM Tutoring',
    },
    serviceType: 'Educational Tutoring',
    areaServed: {
      '@type': 'State',
      name: 'Hawaii',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tutoring Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Math Tutoring' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'English Tutoring' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SAT Prep' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SSAT Prep' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AP Subject Tutoring' } },
      ],
    },
  };

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return organizationSchema;
      case 'home':
        return [organizationSchema, localBusinessSchema, serviceSchema];
      case 'about':
        return organizationSchema;
      case 'educators':
        return organizationSchema;
      case 'contact':
        return [organizationSchema, localBusinessSchema];
      default:
        return organizationSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }}
    />
  );
}
