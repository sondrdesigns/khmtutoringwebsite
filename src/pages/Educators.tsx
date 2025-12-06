import { useState, memo, useMemo } from "react";
import { Award, BookOpen, GraduationCap, X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import kodyImage from "../assets/khm-tutoring-tutor-kody-kim.jpg";
import andrewImage from "../assets/khm-tutoring-tutor-andrew-holzman.jpg";
import noahImage from "../assets/khm-tutoring-tutor-noah-agena.jpg";
import peterImage from "../assets/khm-tutoring-tutor-peter-greenhill.png";
import blytheImage from "../assets/khm-tutoring-tutor-blythe-yangson.jpg";

// Move static data outside component
const subjects = ["All", "Math", "English", "Test Prep", "AP Subjects"];

const educators = [
  {
    name: "Kody Kim",
    subjects: ["Essay Writing", "Reading Comprehension", "Math", "SAT/ACT"],
    tagline: "Founder with years of tutoring experience",
    image: kodyImage,
    bio: "Founder of KHM Tutoring with years of tutoring experience since 2016. Skilled educator focused on improving student scores, test-taking strategies, and understanding of material.",
    achievements: [
      "Financial Systems Analyst at HMSA",
      "Attended Punahou School and University of California, Irvine",
      "Strong track record of increasing student performance and comprehension",
      "Specializes in essay writing, reading comprehension, mathematics, and SAT/ACT prep"
    ],
    experience: "Since 2016",
    certifications: "Punahou School, University of California, Irvine",
    funFact: "Founder of KHM Tutoring",
    grades: "K-12",
    category: "Test Prep",
  },
  {
    name: "Andrew Holzman",
    subjects: ["College Applications", "English", "SAT", "MCAT"],
    tagline: "Medical student and former corporate lawyer",
    image: andrewImage,
    bio: "Medical student and former corporate lawyer with expertise in standardized testing and college admissions consulting.",
    achievements: [
      "Attended Phillips Exeter Academy and University of Chicago",
      "Practiced law internationally (London, Dubai, Sydney, Australia)",
      "Developed an SAT curriculum used by hundreds of students",
      "MCAT score: 525/528 (top 0.5% nationwide)",
      "Students have been accepted to Stanford, Yale, UC Berkeley, UC Irvine, and more",
      "Specializes in creative nonfiction, verbal reasoning, and test-based performance"
    ],
    experience: "Years of experience",
    certifications: "Phillips Exeter Academy, University of Chicago",
    funFact: "MCAT score in top 0.5% nationwide",
    grades: "9-12, College",
    category: "Test Prep",
  },
  {
    name: "Noah Agena",
    subjects: ["Math", "Physics"],
    tagline: "Aspiring mechanical engineer",
    image: noahImage,
    bio: "Aspiring mechanical engineer and experienced calculus and physics tutor with strong STEM background from Iolani School.",
    achievements: [
      "Pursuing a mechanical engineering degree",
      "Integrates academic expertise with passion and encouragement",
      "Strong emphasis on teamwork, discipline, perseverance, and mindset",
      "Experienced in inspiring students to pursue academic and personal goals"
    ],
    experience: "Experienced tutor",
    certifications: "Iolani School",
    funFact: "Aspiring mechanical engineer",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "Peter Greenhill",
    subjects: ["English", "College Essay Writing", "SAT"],
    tagline: "Princeton University graduate",
    image: peterImage,
    bio: "Princeton University graduate in Philosophy with decades of teaching experience at Iolani School and international academic programs.",
    achievements: [
      "Taught English, Philosophy, and SAT at Iolani from 1986–2021",
      "Director of the Iolani Peace Institute for 17 years",
      "Program Dean and Dean of Faculty at Cambridge University summer program",
      "Published writer and longtime educator with extensive global travel",
      "20 years coaching experience and community involvement"
    ],
    experience: "1986-2021 at Iolani",
    certifications: "Princeton University, Philosophy",
    funFact: "Director of Iolani Peace Institute for 17 years",
    grades: "9-12, College",
    category: "English",
  },
  {
    name: "Blythe Yangson",
    subjects: ["Math", "SAT/ACT"],
    tagline: "Experienced science and math tutor",
    image: blytheImage,
    bio: "Experienced science and math tutor dedicated to helping students succeed through engaging and approachable teaching.",
    achievements: [
      "Graduate of Damien Memorial School and current teacher at Damien",
      "Teaches Calculus and Pre-Calculus",
      "Focus on problem-solving, real-world connection, and curiosity-driven learning",
      "Builds confidence, interaction, and academic skill in the classroom"
    ],
    experience: "Current teacher",
    certifications: "Damien Memorial School",
    funFact: "Current teacher at Damien Memorial School",
    grades: "9-12",
    category: "Math",
  },
];

const Educators = memo(() => {
  const [selectedEducator, setSelectedEducator] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEducators = useMemo(() => {
    if (activeFilter === "All") {
      return educators;
    }
    
    // Map filter categories to subject keywords
    const filterMap: Record<string, string[]> = {
      "Math": ["Math", "Mathematics", "Calculus", "Physics", "Pre-Calculus"],
      "English": ["English", "Essay Writing", "Reading Comprehension", "College Essay Writing", "Writing"],
      "Test Prep": ["SAT", "ACT", "SSAT", "MCAT", "Test Prep"],
      "AP Subjects": ["AP", "Advanced Placement"]
    };
    
    const keywords = filterMap[activeFilter] || [];
    
    return educators.filter(edu => 
      edu.subjects.some(subject => 
        keywords.some(keyword => 
          subject.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
  }, [activeFilter]);

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
      <section className="py-8 bg-background border-b border-border">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEducators.map((educator, index) => (
              <button
                key={index}
                onClick={() => setSelectedEducator(index)}
                className="relative min-h-[380px] flex flex-col group animate-fade-in rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-card hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] min-h-44 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={educator.image}
                    alt={`${educator.name} - Expert tutor in Hawaii and Honolulu specializing in ${educator.subjects.join(', ')}`}
                    className={cn(
                      "w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300",
                      educator.name === "Noah Agena" && "scale-110"
                    )}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 flex flex-col flex-1 min-h-0 gap-2">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold font-heading">
                      {educator.name}
                    </h3>
                    <p className="text-primary mb-2 text-xs font-medium">
                      {educator.subjects.join(" • ")}
                    </p>
                    <p className="text-muted-foreground italic text-xs leading-relaxed line-clamp-2">
                      "{educator.tagline}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/50 text-muted-foreground group-hover:text-primary transition-colors text-xs font-medium text-right">
                    Click for full bio →
                  </div>
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
              <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="flex items-center justify-center min-h-64 max-h-96 w-full">
                  <img
                    src={educators[selectedEducator].image}
                    alt={`${educators[selectedEducator].name} - Expert tutor in Hawaii and Honolulu`}
                    className={cn(
                      "max-w-full max-h-96 w-auto h-auto object-contain",
                      educators[selectedEducator].name === "Noah Agena" && "scale-110"
                    )}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-xl mb-1 drop-shadow-lg">
                    {educators[selectedEducator].subjects.join(" • ")}
                  </p>
                  <p className="text-white/90 italic drop-shadow-lg">
                    "{educators[selectedEducator].tagline}"
                  </p>
                </div>
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

              {/* Achievements */}
              {educators[selectedEducator].achievements && (
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block mb-2">Achievements</span>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {educators[selectedEducator].achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Education & Background</span>
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