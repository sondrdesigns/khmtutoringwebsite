interface StructuredDataProps {
  type: 'organization' | 'home' | 'about' | 'educators' | 'contact';
}

const baseUrl = 'https://www.khmtutoring.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${baseUrl}/#organization`,
  name: 'KHM Tutoring',
  description: 'Expert K-12 tutoring services in Hawaii. Math, English, SAT, SSAT, and AP prep. Serving Honolulu, Oahu, and all of Hawaii.',
  url: baseUrl,
  logo: `${baseUrl}/images/khm-tutoring-logo.png`,
  image: `${baseUrl}/images/khm-tutoring-hero.jpeg`,
  telephone: '(808) 381-7856',
  email: 'khmtutoring1@gmail.com',
  foundingDate: '2016',
  founder: {
    '@type': 'Person',
    name: 'Kody Kim',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '21.3069',
    longitude: '-157.8583',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Honolulu',
      '@id': 'https://www.wikidata.org/wiki/Q18094',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Oahu',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Hawaii',
    },
  ],
  sameAs: [
    'https://www.yelp.com/biz/khm-tutoring-urban-honolulu',
    'https://www.linkedin.com/company/khm-tutoring/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '300',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#localbusiness`,
  name: 'KHM Tutoring',
  description: 'Expert K-12 tutoring services in Hawaii. Personalized one-on-one tutoring in Math, English, SAT, SSAT, and AP subjects.',
  url: baseUrl,
  logo: `${baseUrl}/images/khm-tutoring-logo.png`,
  image: `${baseUrl}/images/khm-tutoring-hero.jpeg`,
  telephone: '(808) 381-7856',
  email: 'khmtutoring1@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '21.3069',
    longitude: '-157.8583',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '300',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'KHM Tutoring',
  url: baseUrl,
  publisher: {
    '@id': `${baseUrl}/#organization`,
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tutoring Services',
  provider: {
    '@id': `${baseUrl}/#organization`,
  },
  serviceType: 'Educational Tutoring',
  areaServed: [
    { '@type': 'City', name: 'Honolulu' },
    { '@type': 'AdministrativeArea', name: 'Oahu' },
    { '@type': 'AdministrativeArea', name: 'Hawaii' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tutoring Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Math Tutoring', description: 'Expert math tutoring from arithmetic through advanced calculus for K-12 students in Hawaii.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'English Tutoring', description: 'Reading comprehension, essay writing, grammar, and vocabulary tutoring in Honolulu.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SAT Prep', description: 'Comprehensive SAT preparation with proven score improvement strategies.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SSAT Prep', description: 'SSAT test preparation for private school admissions in Hawaii.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AP Subject Tutoring', description: 'Advanced Placement exam preparation across multiple subjects.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'College Counseling', description: 'College application guidance, essay writing, and admissions consulting.' } },
    ],
  },
};

const educatorPersonSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kody Kim',
    jobTitle: 'Founder & Tutor',
    worksFor: { '@id': `${baseUrl}/#organization` },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Punahou School' },
      { '@type': 'CollegeOrUniversity', name: 'University of California, Irvine' },
    ],
    knowsAbout: ['Essay Writing', 'Reading Comprehension', 'Mathematics', 'SAT Prep', 'ACT Prep'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrew Holzman',
    jobTitle: 'Tutor & College Admissions Consultant',
    worksFor: { '@id': `${baseUrl}/#organization` },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Phillips Exeter Academy' },
      { '@type': 'CollegeOrUniversity', name: 'University of Chicago' },
    ],
    knowsAbout: ['College Applications', 'English', 'SAT Prep', 'MCAT Prep'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Peter Greenhill',
    jobTitle: 'English & Philosophy Tutor',
    worksFor: { '@id': `${baseUrl}/#organization` },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Princeton University' },
    ],
    knowsAbout: ['English', 'Philosophy', 'College Essay Writing', 'SAT Prep'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shwe Win',
    jobTitle: 'Science Tutor & College Counselor',
    worksFor: { '@id': `${baseUrl}/#organization` },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Harvard University' },
    ],
    knowsAbout: ['Neuroscience', 'Chemistry', 'Biology', 'College Counseling', 'Essay Writing'],
    award: ['Fulbright Scholar', 'Harvard Magna Cum Laude'],
  },
];

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact KHM Tutoring',
  url: `${baseUrl}/contact`,
  mainEntity: {
    '@id': `${baseUrl}/#organization`,
  },
};

export function StructuredData({ type }: StructuredDataProps) {
  const getSchemas = () => {
    switch (type) {
      case 'home':
        return [organizationSchema, localBusinessSchema, websiteSchema, serviceSchema];
      case 'about':
        return [organizationSchema, localBusinessSchema];
      case 'educators':
        return [organizationSchema, ...educatorPersonSchemas];
      case 'contact':
        return [organizationSchema, localBusinessSchema, contactPageSchema];
      case 'organization':
      default:
        return [organizationSchema];
    }
  };

  const schemas = getSchemas();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
