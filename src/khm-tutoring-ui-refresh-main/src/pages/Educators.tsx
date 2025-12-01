import { useState } from "react";
import { Award, BookOpen, Calculator, GraduationCap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = ["All", "Math", "English", "Test Prep", "AP Subjects"];

const educators = [
  {
    name: "Dr. Emily Carter",
    subjects: ["Mathematics", "AP Calculus"],
    tagline: "Patient and methodical",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "15+ years of experience teaching advanced mathematics. Specializes in making complex concepts accessible and building student confidence.",
    experience: "15 years",
    certifications: "PhD Mathematics, Certified AP Instructor",
    funFact: "Former competitive chess player",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "Mr. James Wilson",
    subjects: ["English", "Writing"],
    tagline: "Inspiring writer and mentor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Published author with a passion for developing strong writers. Creates engaging lessons that foster creativity and critical thinking.",
    experience: "12 years",
    certifications: "MA English Literature, Published Author",
    funFact: "Has written 3 young adult novels",
    grades: "6-12",
    category: "English",
  },
  {
    name: "Ms. Sarah Kim",
    subjects: ["SAT", "ACT"],
    tagline: "Test-prep specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Expert in standardized test preparation with proven track record of score improvements. Uses data-driven strategies tailored to each student.",
    experience: "10 years",
    certifications: "Certified Test Prep Instructor, Perfect SAT Score",
    funFact: "Loves solving logic puzzles",
    grades: "9-12",
    category: "Test Prep",
  },
  {
    name: "Dr. Michael Torres",
    subjects: ["AP Sciences", "Chemistry"],
    tagline: "Making science fun",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Research scientist turned educator. Brings real-world applications to every lesson and makes science engaging and accessible.",
    experience: "18 years",
    certifications: "PhD Chemistry, AP Science Instructor",
    funFact: "Amateur astronomer",
    grades: "9-12",
    category: "AP Subjects",
  },
  {
    name: "Ms. Rachel Anderson",
    subjects: ["K-8 All Subjects"],
    tagline: "Nurturing young minds",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    bio: "Elementary education specialist with a gift for making learning fun. Creates positive, supportive environments where students feel confident to try.",
    experience: "8 years",
    certifications: "MA Elementary Education, Reading Specialist",
    funFact: "Collects children's books",
    grades: "K-8",
    category: "Math",
  },
  {
    name: "Mr. David Patel",
    subjects: ["Mathematics", "SSAT"],
    tagline: "Building strong foundations",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    bio: "Former private school math department head. Specializes in private school admissions prep and advanced mathematics for middle school students.",
    experience: "14 years",
    certifications: "MA Mathematics Education, SSAT Expert",
    funFact: "Marathon runner",
    grades: "6-9",
    category: "Math",
  },
];

export default function Educators() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEducators = activeFilter === "All" 
    ? educators 
    : educators.filter(edu => edu.category === activeFilter);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Expert Educators
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Experienced, passionate teachers dedicated to your child's success
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background sticky top-20 z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveFilter(subject)}
                className={cn(
                  "px-6 py-2 rounded-full font-semibold transition-all duration-300",
                  activeFilter === subject
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-muted border border-border"
                )}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Educators Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEducators.map((educator, index) => (
              <div
                key={index}
                className="relative h-[400px] perspective-1000 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                {/* Card Container with 3D flip */}
                <div
                  className={cn(
                    "relative w-full h-full transition-transform duration-500 transform-style-3d",
                    flippedCard === index && "rotate-y-180"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCard === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-card"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={educator.image}
                        alt={educator.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-bold mb-2">
                        {educator.name}
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        {educator.subjects.join(" • ")}
                      </p>
                      <p className="text-muted-foreground italic mb-4">
                        "{educator.tagline}"
                      </p>
                      <div className="flex gap-2">
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                      Hover to flip
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden border-2 border-primary shadow-xl bg-card p-6"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="h-full flex flex-col">
                      <h3 className="text-xl font-heading font-bold mb-4">
                        {educator.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">
                        {educator.bio}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{educator.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground text-xs">{educator.certifications}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Grades: {educator.grades}</span>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground italic">
                            Fun fact: {educator.funFact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
