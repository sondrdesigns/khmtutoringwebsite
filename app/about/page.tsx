import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'About KHM Tutoring | Premier Tutoring Service',
  description: "KHM Tutoring's mission: empowering Hawaii students through personalized education since 2016. 10+ expert tutors, 300+ students helped.",
  keywords: ['about KHM Tutoring', 'tutoring company', 'educational services', 'tutoring history', 'tutoring mission', 'experienced educators', 'personalized learning', 'Hawaii tutoring'],
  alternates: {
    canonical: 'https://www.khmtutoring.com/about',
  },
  openGraph: {
    title: 'About KHM Tutoring | Premier Tutoring Service',
    description: "KHM Tutoring's mission: empowering Hawaii students through personalized education since 2016.",
    url: 'https://www.khmtutoring.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="about" />
      <AboutContent />
    </>
  );
}
