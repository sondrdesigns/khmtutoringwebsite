import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/ContactContent';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Contact KHM Tutoring | Free Consultation',
  description: 'Book a free tutoring consultation in Hawaii. In-home or online options with flexible scheduling. Expert tutors in Honolulu & Oahu.',
  keywords: ['SAT tutoring Hawaii', 'SSAT Tutor hawaii', 'math tutor hawaii', 'best tutor near me', 'contact KHM Tutoring', 'tutoring consultation', 'book tutor', 'tutoring inquiry', 'free consultation', 'schedule tutoring', 'Hawaii tutoring'],
  alternates: {
    canonical: 'https://www.khmtutoring.com/contact',
  },
  openGraph: {
    title: 'Contact KHM Tutoring | Book Your Free Consultation',
    description: 'Book a free tutoring consultation in Hawaii. In-home or online, flexible scheduling.',
    url: 'https://www.khmtutoring.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData type="contact" />
      <ContactContent />
    </>
  );
}
