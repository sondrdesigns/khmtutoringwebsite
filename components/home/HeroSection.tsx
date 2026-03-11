'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, TrendingUp, GraduationCap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '300+', label: 'Students Helped', color: 'text-primary' },
  { icon: TrendingUp, value: '+15%', label: 'Avg. Score Boost', color: 'text-emerald-500' },
  { icon: GraduationCap, value: '10+', label: 'Expert Tutors', color: 'text-secondary' },
  { icon: Star, value: '5.0', label: 'Parent Rating', color: 'text-yellow-500' },
];

export function HeroSection() {
  const router = useRouter();

  const handleConsultationClick = useCallback(() => {
    router.push('/contact');
  }, [router]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-20 overflow-hidden bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" 
      />
      
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-secondary/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <motion.span 
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(59, 130, 246, 0)',
                    '0 0 20px 10px rgba(59, 130, 246, 0.2)',
                    '0 0 0 0 rgba(59, 130, 246, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-secondary/30 to-primary/30 backdrop-blur-sm text-secondary-foreground rounded-full text-xs md:text-sm font-semibold border border-secondary/30 inline-flex items-center gap-2"
              >
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                Hawaii&apos;s Trusted Tutoring Service
              </motion.span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight"
            >
              <span className="text-gradient font-bold relative inline-block">
                Hawaii Tutoring
                <motion.span
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left"
                />
              </span>{' '}
              That Gets Results
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Looking for a math tutor in Honolulu? KHM Tutoring provides expert tutoring services across Oahu, 
              specializing in Math, English, SAT, and SSAT prep. Our experienced Hawaii tutors deliver personalized 
              one-on-one instruction that builds confidence and achieves academic excellence for K-12 students.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  onClick={handleConsultationClick}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
                >
                  <motion.span
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Book Free Consultation
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 md:pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                    <span className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mt-8 lg:mt-0 hidden lg:block"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/khm-tutoring-hero.jpeg"
                alt="KHM Tutoring students learning together in Hawaii - Expert K-12 tutoring services in Honolulu and Oahu"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
