import type { Metadata } from 'next';
import { EducatorsContent } from '@/components/pages/EducatorsContent';

export const metadata: Metadata = {
  title: 'Meet Our Expert Tutors | KHM Tutoring Hawaii',
  description: 'Meet our team of certified, experienced educators specializing in Math, English, SAT, SSAT, and AP prep. All tutors are background-checked and dedicated to student success in Hawaii.',
  keywords: ['SAT tutoring Hawaii', 'SSAT Tutor hawaii', 'math tutor hawaii', 'best tutor near me', 'tutors', 'educators', 'math tutors', 'English tutors', 'SAT tutors', 'AP tutors', 'certified tutors', 'experienced teachers', 'test prep specialists', 'Hawaii tutors', 'best tutors Hawaii'],
  alternates: {
    canonical: 'https://www.khmtutoring.com/educators',
  },
  openGraph: {
    title: 'Meet Our Expert Tutors | KHM Tutoring Hawaii',
    description: 'Meet our team of certified, experienced educators specializing in Math, English, SAT, SSAT, and AP prep.',
    url: 'https://www.khmtutoring.com/educators',
  },
};

export default function EducatorsPage() {
  return <EducatorsContent />;
}
