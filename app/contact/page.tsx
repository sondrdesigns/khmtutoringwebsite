import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/ContactContent';

export const metadata: Metadata = {
  title: 'Contact KHM Tutoring | Book Your Free Consultation',
  description: 'Schedule your free consultation today. Flexible scheduling available with in-home or online tutoring options. Get started on your academic journey with expert tutors in Hawaii.',
  keywords: ['SAT tutoring Hawaii', 'SSAT Tutor hawaii', 'math tutor hawaii', 'best tutor near me', 'contact KHM Tutoring', 'tutoring consultation', 'book tutor', 'tutoring inquiry', 'free consultation', 'schedule tutoring', 'Hawaii tutoring'],
  alternates: {
    canonical: 'https://www.khmtutoring.com/contact',
  },
  openGraph: {
    title: 'Contact KHM Tutoring | Book Your Free Consultation',
    description: 'Schedule your free consultation today. Flexible scheduling available with in-home or online tutoring options.',
    url: 'https://www.khmtutoring.com/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
