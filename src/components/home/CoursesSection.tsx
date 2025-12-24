import { useState, memo, useMemo } from "react";
import { BookOpen, Calculator, FileText, GraduationCap, Target, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

// Move static data outside component
const courses = [
  {
    id: "k12",
    name: "K-12",
    icon: GraduationCap,
    description: "Comprehensive support across all grade levels",
    points: [
      "Grade-appropriate curriculum alignment",
      "Homework assistance and study skills",
      "Foundation building for future success",
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    icon: Calculator,
    description: "From basic arithmetic to advanced calculus",
    points: [
      "Concept mastery and problem-solving",
      "Step-by-step explanations",
      "Practice problems and real-world applications",
    ],
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    description: "Reading, writing, and language arts excellence",
    points: [
      "Reading comprehension strategies",
      "Essay writing and composition",
      "Grammar and vocabulary development",
    ],
  },
  {
    id: "ap",
    name: "AP Subjects",
    icon: Target,
    description: "Advanced Placement exam prep",
    points: [
      "In-depth subject knowledge",
      "Practice with AP-style questions",
      "Test-taking strategies and time management",
    ],
  },
  {
    id: "sat",
    name: "SAT",
    icon: TrendingUp,
    description: "Comprehensive SAT prep",
    points: [
      "Math and Evidence-Based Reading & Writing",
      "Full-length practice tests",
      "Score improvement strategies",
    ],
  },
  {
    id: "ssat",
    name: "SSAT",
    icon: FileText,
    description: "Secondary School Admission Test prep",
    points: [
      "Verbal, quantitative, and reading sections",
      "Private school admission strategies",
      "Confidence building for test day",
    ],
  },
];

export const CoursesSection = memo(() => {
  const [activeTab, setActiveTab] = useState("k12");

  const activeCourse = useMemo(() => courses.find((c) => c.id === activeTab)!, [activeTab]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-muted/30 to-primary/5 relative overflow-hidden">
      {/* Animated Background - Blue themed */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 md:mb-4"
          >
            <span className="text-gradient font-bold">Courses</span> We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
          >
            Expert tutoring tailored to your academic goals
          </motion.p>
        </motion.div>

        {/* Course Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {courses.map((course, index) => (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(course.id)}
              className={cn(
                "px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm md:text-base relative overflow-hidden",
                activeTab === course.id
                  ? "bg-gradient-to-r from-primary via-primary/90 to-primary text-white shadow-lg border-2 border-primary/30"
                  : "bg-card hover:bg-primary/10 border-2 border-primary/20 hover:border-primary/40 text-foreground/80 hover:text-primary"
              )}
            >
              {activeTab === course.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary"
                  style={{ borderRadius: "9999px" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <course.icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              <span className="relative z-10">{course.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Course Card */}
        <div className="max-w-4xl mx-auto px-2">
          <motion.div
            key={activeCourse.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-card via-primary/5 to-card/80 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-primary/20 p-6 md:p-8 lg:p-12 relative overflow-hidden hover:border-primary/40 transition-all"
          >
            {/* Animated Background Gradient - Blue themed */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl"
            />

            <div className="flex items-start gap-4 md:gap-6 mb-6 relative z-10">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                className="p-3 md:p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl md:rounded-2xl flex-shrink-0 shadow-lg border border-primary/20"
              >
                <activeCourse.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-heading font-bold mb-2"
                >
                  {activeCourse.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-muted-foreground"
                >
                  {activeCourse.description}
                </motion.p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 relative z-10">
              {activeCourse.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.5, rotate: 90 }}
                    className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/50"
                  />
                  <p className="text-sm md:text-base text-foreground/80 group-hover:text-foreground transition-colors">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});