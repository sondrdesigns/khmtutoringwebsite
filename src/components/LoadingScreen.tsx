import { useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "../assets/khm-tutoring-logo.png";
import { useAnimationConfig } from "../hooks/use-animation-config";

// Memoize particle array
const PARTICLE_COUNT = 20;

export const LoadingScreen = memo(() => {
  const animationConfig = useAnimationConfig();
  const [isLoading, setIsLoading] = useState(true);
  
  // Reduce particle count on mobile
  const particleCount = useMemo(() => {
    return animationConfig.isMobile ? Math.floor(PARTICLE_COUNT / 3) : PARTICLE_COUNT;
  }, [animationConfig.isMobile]);

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
      delay: Math.random() * 2,
      duration: (4 + Math.random() * 3) * animationConfig.durationMultiplier,
    })), [windowDimensions, particleCount, animationConfig.durationMultiplier]
  );

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 * animationConfig.durationMultiplier, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Background Shapes - disabled on mobile */}
          {!animationConfig.shouldReduceAnimations && (
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8 * animationConfig.durationMultiplier,
                  repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 10 * animationConfig.durationMultiplier,
                  repeat: animationConfig.allowInfiniteAnimations ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
              />
            </div>
          )}

          {/* Floating Particles - reduced on mobile */}
          {animationConfig.allowInfiniteAnimations && particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
              }}
              animate={{
                y: [particle.y, particle.y - 50, particle.y],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${(particle.x / windowDimensions.width) * 100}%`,
                top: `${(particle.y / windowDimensions.height) * 100}%`,
              }}
            />
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo Container with Glow Effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1 * animationConfig.durationMultiplier,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative"
            >
              {/* Pulsing Glow Ring - disabled on mobile */}
              {animationConfig.allowInfiniteAnimations && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-white/30 rounded-full blur-2xl"
                />
              )}
              
              {/* Logo */}
              {animationConfig.allowInfiniteAnimations ? (
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative bg-white p-8 rounded-3xl shadow-2xl"
                >
                  <img
                    src={logoImage}
                    alt="KHM Tutoring - Expert Tutors in Hawaii and Honolulu"
                    className="w-24 h-24 object-contain"
                    loading="eager"
                    width={96}
                    height={96}
                  />
                </motion.div>
              ) : (
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <img
                    src={logoImage}
                    alt="KHM Tutoring - Expert Tutors in Hawaii and Honolulu"
                    className="w-24 h-24 object-contain"
                    loading="eager"
                    width={96}
                    height={96}
                  />
                </div>
              )}

              {/* Rotating Border - disabled on mobile */}
              {animationConfig.allowInfiniteAnimations && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, white, transparent)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "2px",
                  }}
                />
              )}
            </motion.div>

            {/* Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 * animationConfig.durationMultiplier, duration: 0.8 * animationConfig.durationMultiplier }}
              className="text-center space-y-2"
            >
              {animationConfig.allowInfiniteAnimations ? (
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2 * animationConfig.durationMultiplier,
                    repeat: Infinity,
                    ease: "easeInOut",
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
                transition={{ delay: 0.8 * animationConfig.durationMultiplier }}
                className="text-white/90 text-lg italic"
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