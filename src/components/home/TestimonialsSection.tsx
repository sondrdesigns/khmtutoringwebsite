import { memo, useCallback, useMemo } from "react";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationConfig } from "../../hooks/use-animation-config";

// Move static data outside component
const testimonials = [
  {
    name: "Arianna Hwang",
    content: "I can't say enough good things about KHM Tutoring. My sister has been struggling in math for a while, but with their help, she's made incredible progress. They are knowledgeable, patient, and really take the time to understand my sister's learning style, which has resulted in a significant improvement in her test scores and grades. Thank you so much!",
    rating: 5,
  },
  {
    name: "Lindsay Wong",
    content: "Cody has been tutoring my daughter for the SATs and their work has helped her feel more ready for the exam. Cody tailors is work to meet her exact needs and helps her set up a plan for studying beyond their sessions. Overall, it has been a really positive experience!",
    rating: 5,
  },
  {
    name: "Junko Kita",
    content: "Kody and David are both awesome! The sessions are engaging and tailored to exactly what my son need help with. He is gaining more confidence in Algebra. Highly recommended for anyone who wants quality tutoring.",
    rating: 5,
  },
  {
    name: "Young Kim",
    content: "We just started KHM tutoring and so far we are very pleased with how both our kids are progressing and learning with the tutors. I really like their attention to detail and their dedication.",
    rating: 5,
  },
  {
    name: "Dhianie Gamarra",
    content: "Grateful for KHM's tutoring support! My daughter had a hard time adjusting to math in her first year at a new school (7th grade) and fell behind on key skills. Kody worked with her over the summer to strengthen the area she struggled with and then we have Aizen after Summer-break helping her to review and practice math skills so she could feel prepared each week in classroom. She is now in her second semester of 8th grade, earning better grades and showing more confidence in math. Excellent & supportive tutor - highly recommend!",
    rating: 5,
  },
];

export const TestimonialsSection = memo(() => {
  const animationConfig = useAnimationConfig();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex]);
  const starArray = useMemo(() => Array.from({ length: activeTestimonial.rating }), [activeTestimonial.rating]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated Background - disabled on mobile */}
      {!animationConfig.shouldReduceAnimations && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 * animationConfig.durationMultiplier }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
          >
            What Our <span className="text-gradient font-bold">Students & Parents</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * animationConfig.durationMultiplier }}
            className="text-base md:text-lg text-muted-foreground"
          >
            Real results from real families
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 * animationConfig.durationMultiplier }}
                className="px-4"
              >
                <motion.div
                  whileHover={!animationConfig.isMobile ? { scale: 1.02 } : undefined}
                  className="bg-gradient-to-br from-card via-card to-card/80 rounded-3xl shadow-2xl border border-border p-6 md:p-8 lg:p-12 relative overflow-hidden"
                >
                  {/* Quote Icon Background - disabled on mobile */}
                  {animationConfig.allowInfiniteAnimations && (
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 5 * animationConfig.durationMultiplier,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-4 right-4 md:top-8 md:right-8 opacity-10"
                    >
                      <Quote className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                    </motion.div>
                  )}

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {starArray.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star
                          className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * animationConfig.durationMultiplier }}
                    className="text-base md:text-lg text-foreground/90 mb-8 leading-relaxed relative z-10 italic"
                  >
                    "{activeTestimonial.content}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 * animationConfig.durationMultiplier }}
                    className="flex items-center gap-4 relative z-10"
                  >
                    <motion.div
                      whileHover={!animationConfig.isMobile ? { scale: 1.1, rotate: 360 } : undefined}
                      transition={{ duration: 0.5 * animationConfig.durationMultiplier }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg md:text-xl"
                    >
                      {activeTestimonial.name.charAt(0)}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        {activeTestimonial.name}
                      </p>
                    </div>
                  </motion.div>

                  {/* Decorative Gradient - disabled on mobile */}
                  {animationConfig.allowInfiniteAnimations && (
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 4 * animationConfig.durationMultiplier,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
                    />
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={!animationConfig.isMobile ? { scale: 1.3 } : undefined}
                whileTap={!animationConfig.isMobile ? { scale: 0.9 } : undefined}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-gradient-to-r from-primary to-secondary w-8 shadow-lg"
                    : "bg-border w-2 hover:bg-border/80"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});