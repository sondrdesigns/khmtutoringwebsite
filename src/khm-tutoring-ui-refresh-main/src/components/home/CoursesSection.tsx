import { useState } from "react";
import { BookOpen, Calculator, FileText, GraduationCap, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    description: "Advanced Placement exam preparation",
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
    description: "Comprehensive SAT test preparation",
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

export const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState("k12");

  const activeCourse = courses.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Courses We Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tutoring tailored to your academic goals
          </p>
        </div>

        {/* Course Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveTab(course.id)}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2",
                activeTab === course.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card hover:bg-muted border border-border"
              )}
            >
              <course.icon className="w-5 h-5" />
              {course.name}
            </button>
          ))}
        </div>

        {/* Active Course Card */}
        <div className="max-w-4xl mx-auto">
          <div
            key={activeCourse.id}
            className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12 animate-scale-in"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <activeCourse.icon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-heading font-bold mb-2">
                  {activeCourse.name}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {activeCourse.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {activeCourse.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <p className="text-foreground/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
