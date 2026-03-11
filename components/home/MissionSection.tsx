'use client';

import { Award, Clock, Heart, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Award,
    title: 'Experienced Educators',
    description: 'Certified teachers with years of tutoring experience across all subjects',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: "Custom learning plans tailored to each student's unique needs and goals",
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Sessions that fit your busy family schedule, online or in-person',
  },
  {
    icon: Heart,
    title: 'Proven Results',
    description: 'Track record of improved grades, test scores, and student confidence',
  },
];

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20"
            >
              <span className="text-primary font-semibold">Our Mission</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold"
            >
              Honolulu&apos;s Trusted{' '}
              <span className="text-gradient font-bold relative inline-block">
                Math Tutors &amp; Test Prep
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left"
                />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              At KHM Tutoring, we&apos;ve helped over 300 students across Honolulu and Oahu achieve their academic goals. 
              Whether your child needs a math tutor for algebra and calculus, help with SAT prep, or support with 
              reading comprehension, our experienced Hawaii tutors deliver results you can measure.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Our tutoring in Hawaii focuses on personalized one-on-one instruction that adapts to each student&apos;s 
              learning style. From elementary students building foundational skills to high schoolers preparing for 
              college entrance exams, KHM Tutoring is Oahu&apos;s trusted choice for academic excellence.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"
                />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/10 transition-all duration-300 shadow-lg"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-heading font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
