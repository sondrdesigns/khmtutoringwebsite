import { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "../assets/khm-tutoring-logo.png";
import { useAnimationConfig } from "../hooks/use-animation-config";

// Reduced particle count for better performance
const PARTICLE_COUNT = 12;

export const LoadingScreen = memo(() => {
  const animationConfig = useAnimationConfig();
  const [isLoading, setIsLoading] = useState(true);
  
  // Reduce particle count further for better performance
  const particleCount = useMemo(() => {
    if (animationConfig.isMobile || animationConfig.shouldReduceAnimations) {
      return 0; // No particles on mobile or reduced motion
    }
    return Math.floor(PARTICLE_COUNT / 2); // Reduced from 20 to 6 on desktop
  }, [animationConfig.isMobile, animationConfig.shouldReduceAnimations]);

  // Memoize window dimensions to avoid recalculating on every render
  const windowDimensions = useMemo(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  }), []);

  const particles = useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * windowDimensions.width,
      y: Math.random() * windowDimensions.height,
      delay: Math.random() * 1.5,
      duration: (3 + Math.random() * 2) * animationConfig.durationMultiplier,
    })), [windowDimensions, particleCount, animationConfig.durationMultiplier]
  );

  useEffect(() => {
    // Optimized loading: check if page is ready, with minimum display time for smooth animation
    const minDisplayTime = 1200; // Reduced from 2000ms for faster perceived performance
    const startTime = Date.now();
    
    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      checkReady();
    } else {
      window.addEventListener('load', checkReady);
      return () => window.removeEventListener('load', checkReady);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 * animationConfig.durationMultiplier, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          style={{ contain: 'layout style paint', willChange: 'opacity' }}
        >
          {/* Simplified Background Shapes - reduced blur for performance */}
          {!animationConfig.shouldReduceAnimations && animationConfig.allowInfiniteAnimations && (
            <div className="absolute inset-0" style={{ contain: 'layout style paint' }}>
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={{
                  duration: 6 * animationConfig.durationMultiplier,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl"
                style={{ 
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                  duration: 8 * animationConfig.durationMultiplier,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl"
                style={{ 
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          )}

          {/* Floating Particles - optimized for performance */}
          {particleCount > 0 && particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 0,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                left: `${(particle.x / windowDimensions.width) * 100}%`,
                top: `${(particle.y / windowDimensions.height) * 100}%`,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                contain: 'layout style paint'
              }}
            />
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo Container with Glow Effect - optimized */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8 * animationConfig.durationMultiplier,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                contain: 'layout style paint'
              }}
            >
              {/* Simplified Pulsing Glow Ring - reduced blur */}
              {animationConfig.allowInfiniteAnimations && (
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-white/25 rounded-full blur-xl"
                  style={{
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
              )}
              
              {/* Logo - using CSS animation for smoother performance */}
              <div
                className={`relative bg-white p-8 rounded-3xl shadow-2xl ${animationConfig.allowInfiniteAnimations ? 'loading-logo-float' : ''}`}
                style={
                  animationConfig.allowInfiniteAnimations
                    ? ({
                        '--float-duration': `${2.5 * animationConfig.durationMultiplier}s`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <img
                  src={logoImage}
                  alt="KHM Tutoring - Expert Tutors in Hawaii and Honolulu"
                  className="w-24 h-24 object-contain"
                  loading="eager"
                  width={96}
                  height={96}
                  decoding="async"
                />
              </div>

              {/* Optimized Rotating Border - using CSS animation for better performance */}
              {animationConfig.allowInfiniteAnimations && (
                <div
                  className="absolute inset-0 rounded-3xl loading-spin-border"
                  style={{
                    '--spin-duration': `${4 * animationConfig.durationMultiplier}s`,
                  } as React.CSSProperties}
                />
              )}
            </motion.div>

            {/* Text Animation - optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 * animationConfig.durationMultiplier, duration: 0.6 * animationConfig.durationMultiplier }}
              className="text-center space-y-2"
              style={{ 
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              {animationConfig.allowInfiniteAnimations ? (
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  animate={{
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 2.5 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    willChange: 'opacity',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  KHM Tutoring
                </motion.h1>
              ) : (
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  KHM Tutoring
                </h1>
              )}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 * animationConfig.durationMultiplier, duration: 0.5 * animationConfig.durationMultiplier }}
                className="text-white/90 text-lg italic"
                style={{
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden'
                }}
              >
                Take it higher
              </motion.p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});