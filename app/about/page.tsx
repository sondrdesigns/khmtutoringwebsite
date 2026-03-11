import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About KHM Tutoring | Premier Tutoring Service',
  description: "Learn about KHM Tutoring's mission to empower students through personalized education. Experienced educators, proven results, commitment to academic excellence. Serving Hawaii.",
  keywords: ['about KHM Tutoring', 'tutoring company', 'educational services', 'tutoring history', 'tutoring mission', 'experienced educators', 'personalized learning', 'Hawaii tutoring'],
  alternates: {
    canonical: 'https://www.khmtutoring.com/about',
  },
  openGraph: {
    title: 'About KHM Tutoring | Premier Tutoring Service',
    description: "Learn about KHM Tutoring's mission to empower students through personalized education.",
    url: 'https://www.khmtutoring.com/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
