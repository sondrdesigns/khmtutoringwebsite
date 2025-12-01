import { Button } from "../ui/button";
import { ArrowRight, Users, TrendingUp, Sparkles, Award } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-20 overflow-hidden bg-background">
      {/* Enhanced Background gradient with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" 
      />
      
      {/* Animated shapes with motion */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
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
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"
      />

      {/* Floating Sparkles for Mobile Magic */}
      <div className="absolute inset-0 md:hidden overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left mb-8 lg:mb-0">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <motion.span 
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 20px 10px rgba(59, 130, 246, 0.2)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-secondary/30 to-primary/30 backdrop-blur-sm text-secondary-foreground rounded-full text-xs md:text-sm font-semibold border border-secondary/30 inline-flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                Trusted by 500+ Students
              </motion.span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight"
            >
              Personalized{" "}
              <span className="text-gradient font-bold relative inline-block">
                K-12 Tutoring
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
              </span>{" "}
              for Success
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Expert instruction in Math, English, and Test Prep. Take it higher with personalized learning that builds confidence and achieves academic excellence.
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
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
                >
                  <motion.span
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Book Free Consultation
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-full border-2 hover:bg-primary/5 w-full sm:w-auto"
                >
                  View Courses
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Image & Stats */}
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
              {/* Gradient Overlay for Mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10 md:hidden" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?w=800"
                alt="Students learning together"
                className="w-full h-auto"
              />
            </motion.div>
            
            {/* Floating Stats Cards with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gradient-to-br from-card to-card/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-6 border border-border max-w-[160px] md:max-w-[200px]"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <motion.div 
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg md:rounded-xl"
                >
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  >
                    500+
                  </motion.p>
                  <p className="text-xs md:text-sm text-muted-foreground">Students Helped</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-br from-card to-card/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-6 border border-border max-w-[160px] md:max-w-[200px]"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <motion.div 
                  animate={{
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-2 md:p-3 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg md:rounded-xl"
                >
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="text-lg md:text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                  >
                    +15%
                  </motion.p>
                  <p className="text-xs md:text-sm text-muted-foreground">Avg. Improvement</p>
                </div>
              </div>
            </motion.div>

            {/* New Achievement Badge - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.1 }}
              className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-accent to-accent/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 border-white/50 z-20"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Award className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};