import { useState, memo, useMemo } from "react";
import { Award, BookOpen, GraduationCap, Star, X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

// Move static data outside component
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

const Educators = memo(() => {
  const [selectedEducator, setSelectedEducator] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEducators = useMemo(() => 
    activeFilter === "All" 
      ? educators 
      : educators.filter(edu => edu.category === activeFilter),
    [activeFilter]
  );

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-heading font-bold">
              Meet Our{" "}
              <span className="text-gradient font-bold">
                Expert Educators
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced, passionate tutors in Hawaii and Honolulu dedicated to your child's success. Serving students across Oahu and all of Hawaii.
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
                  "px-6 py-2 rounded-full transition-all duration-300",
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
              <button
                key={index}
                onClick={() => setSelectedEducator(index)}
                className="relative h-[400px] group animate-fade-in rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-card hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={educator.image}
                    alt={`${educator.name} - Expert tutor in Hawaii and Honolulu specializing in ${educator.subjects.join(', ')}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    width={400}
                    height={192}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2">
                    {educator.name}
                  </h3>
                  <p className="text-primary mb-2">
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
                <div className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-primary transition-colors">
                  Click for full bio →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Educator Detail Modal */}
      {selectedEducator !== null && (
        <Dialog open={selectedEducator !== null} onOpenChange={() => setSelectedEducator(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-heading font-bold">
                {educators[selectedEducator].name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Full bio and details for {educators[selectedEducator].name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Educator Image */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={educators[selectedEducator].image}
                  alt={`${educators[selectedEducator].name} - Expert tutor in Hawaii and Honolulu`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={600}
                  height={256}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-xl mb-1">
                    {educators[selectedEducator].subjects.join(" • ")}
                  </p>
                  <p className="text-white/90 italic">
                    "{educators[selectedEducator].tagline}"
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-2 justify-center">
                <Star className="w-6 h-6 fill-accent text-accent" />
                <Star className="w-6 h-6 fill-accent text-accent" />
                <Star className="w-6 h-6 fill-accent text-accent" />
                <Star className="w-6 h-6 fill-accent text-accent" />
                <Star className="w-6 h-6 fill-accent text-accent" />
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xl font-semibold mb-2">About</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {educators[selectedEducator].bio}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Experience</span>
                  </div>
                  <p className="text-muted-foreground">{educators[selectedEducator].experience}</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Grades</span>
                  </div>
                  <p className="text-muted-foreground">{educators[selectedEducator].grades}</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Certifications</span>
                    <p className="text-muted-foreground">{educators[selectedEducator].certifications}</p>
                  </div>
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-center">
                  <span className="font-semibold">Fun Fact:</span>{" "}
                  <span className="text-muted-foreground italic">{educators[selectedEducator].funFact}</span>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
});

export default Educators;