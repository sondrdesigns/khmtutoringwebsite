import { memo, useMemo, useCallback } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Users, TrendingUp, Sparkles, Award } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/khm-tutoring-hero-IMG_5743-scaled.jpeg";
import { useAnimationConfig } from "../../hooks/use-animation-config";

// Memoize sparkle array to avoid recreating on every render
const SPARKLE_COUNT = 15;

export const HeroSection = memo(() => {
  const navigate = useNavigate();
  const animationConfig = useAnimationConfig();
  
  // Memoize sparkle positions and animation configs to prevent recalculation
  const sparkles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  const handleConsultationClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-20 overflow-hidden bg-background">
      {/* Enhanced Background gradient with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 * animationConfig.durationMultiplier }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" 
      />
      
      {/* Animated shapes with motion - reduced/disabled on mobile */}
      {!animationConfig.shouldReduceAnimations && (
        <>
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-secondary/20 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
        </>
      )}

      {/* Floating Sparkles for Mobile Magic - disabled on mobile when reducing animations */}
      {animationConfig.allowInfiniteAnimations && sparkles.length > 0 && (
        <div className="absolute inset-0 md:hidden overflow-hidden pointer-events-none">
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{
                x: sparkle.x,
                y: sparkle.y,
                opacity: 0,
              }}
              animate={{
                y: [sparkle.y, sparkle.y - 50, sparkle.y],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: sparkle.duration * animationConfig.durationMultiplier,
                repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{ willChange: 'transform, opacity' }}
            >
              <Sparkles className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left mb-8 lg:mb-0">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 * animationConfig.durationMultiplier, delay: 0.2 * animationConfig.durationMultiplier }}
              className="inline-block"
            >
              {animationConfig.allowInfiniteAnimations ? (
                <motion.span 
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 20px 10px rgba(59, 130, 246, 0.2)",
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                  }}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-secondary/30 to-primary/30 backdrop-blur-sm text-secondary-foreground rounded-full text-xs md:text-sm font-semibold border border-secondary/30 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  Trusted by 300+ Students
                </motion.span>
              ) : (
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-secondary/30 to-primary/30 backdrop-blur-sm text-secondary-foreground rounded-full text-xs md:text-sm font-semibold border border-secondary/30 inline-flex items-center gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  Trusted by 300+ Students
                </span>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 0.4 * animationConfig.durationMultiplier }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight"
            >
              Turning{" "}
              <span className="text-gradient font-bold relative inline-block">
                Potential
                {animationConfig.allowInfiniteAnimations && (
                  <motion.span
                    animate={{
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 * animationConfig.durationMultiplier,
                      repeat: Infinity,
                      delay: 1 * animationConfig.durationMultiplier,
                    }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left"
                  />
                )}
              </span>{" "}
              into Performance
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 0.6 * animationConfig.durationMultiplier }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Expert tutoring in Hawaii and Honolulu. Specializing in Math, English, and SAT/SSAT prep for students across Oahu. Take it higher with personalized learning that builds confidence and achieves academic excellence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 0.8 * animationConfig.durationMultiplier }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={!animationConfig.isMobile ? { scale: 1.05 } : undefined}
                whileTap={!animationConfig.isMobile ? { scale: 0.95 } : undefined}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  onClick={handleConsultationClick}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
                >
                  {animationConfig.allowInfiniteAnimations && (
                    <motion.span
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2 * animationConfig.durationMultiplier,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">
                    Book Free Consultation
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Image & Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 * animationConfig.durationMultiplier, delay: 0.4 * animationConfig.durationMultiplier }}
            className="relative mt-8 lg:mt-0 hidden lg:block overflow-visible"
          >
            <motion.div 
              whileHover={!animationConfig.isMobile ? { scale: 1.02 } : undefined}
              transition={{ duration: 0.3 * animationConfig.durationMultiplier }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Gradient Overlay for Mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10 md:hidden" />
              <ImageWithFallback
                src={heroImage}
                alt="KHM Tutoring students learning together in Hawaii - Expert K-12 tutoring services in Honolulu and Oahu"
                className="w-full h-auto"
                loading="eager"
                fetchPriority="high"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
            </motion.div>
            
            {/* Floating Stats Cards with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 1 * animationConfig.durationMultiplier }}
              whileHover={!animationConfig.isMobile ? { scale: 1.1, rotate: -2 } : undefined}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gradient-to-br from-card to-card/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-6 border border-border max-w-[160px] md:max-w-[200px]"
            >
              <div className="flex items-center gap-2 md:gap-3">
                {animationConfig.allowInfiniteAnimations ? (
                  <motion.div 
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2 * animationConfig.durationMultiplier,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg md:rounded-xl"
                  >
                    <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </motion.div>
                ) : (
                  <div className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg md:rounded-xl">
                    <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                )}
                <div>
                  {animationConfig.allowInfiniteAnimations ? (
                    <motion.p 
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2 * animationConfig.durationMultiplier,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                      300+
                    </motion.p>
                  ) : (
                    <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      300+
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-muted-foreground">Students Helped</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 1.2 * animationConfig.durationMultiplier }}
              whileHover={!animationConfig.isMobile ? { scale: 1.1, rotate: 2 } : undefined}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-card/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-6 border-2 border-border/80 max-w-[160px] md:max-w-[200px] z-10"
            >
              <div className="flex items-center gap-2 md:gap-3">
                {animationConfig.allowInfiniteAnimations ? (
                  <motion.div 
                    animate={{
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 2 * animationConfig.durationMultiplier,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-2 md:p-3 bg-secondary/20 rounded-lg md:rounded-xl"
                  >
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
                  </motion.div>
                ) : (
                  <div className="p-2 md:p-3 bg-secondary/20 rounded-lg md:rounded-xl">
                    <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
                  </div>
                )}
                <div>
                  {animationConfig.allowInfiniteAnimations ? (
                    <motion.p 
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2 * animationConfig.durationMultiplier,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5 * animationConfig.durationMultiplier,
                      }}
                      className="text-lg md:text-2xl font-bold text-secondary"
                    >
                      +15%
                    </motion.p>
                  ) : (
                    <p className="text-lg md:text-2xl font-bold text-secondary">
                      +15%
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-foreground/80 font-medium">Avg. Improvement</p>
                </div>
              </div>
            </motion.div>

            {/* New Achievement Badge - Mobile Only */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 * animationConfig.durationMultiplier, delay: 1.4 * animationConfig.durationMultiplier }}
              whileHover={!animationConfig.isMobile ? { scale: 1.1 } : undefined}
              className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-accent to-accent/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 border-white/50 z-20"
            >
              {animationConfig.allowInfiniteAnimations ? (
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>
              ) : (
                <Award className="w-12 h-12 text-white" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});