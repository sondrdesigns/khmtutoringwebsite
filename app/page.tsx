import { HeroSection } from '@/components/home/HeroSection';
import { CoursesSection } from '@/components/home/CoursesSection';
import { MissionSection } from '@/components/home/MissionSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <CoursesSection />
      <MissionSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
