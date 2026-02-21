import { useState, memo, useMemo, useCallback } from "react";
import { Award, BookOpen, GraduationCap, X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import kodyImage from "../assets/khm-tutoring-tutor-kody-kim.png";
import andrewImage from "../assets/khm-tutoring-tutor-andrew-holzman.jpg";
import noahImage from "../assets/khm-tutoring-tutor-noah-agena.png";
import peterImage from "../assets/khm-tutoring-tutor-peter-greenhill.png";
import blytheImage from "../assets/khm-tutoring-tutor-blythe-yangson.png";
import keenanImage from "../assets/khm-tutoring-tutor-keenan-kim.png";
import coltonImage from "../assets/khm-tutoring-tutor-colton-inamine.png";
import davidImage from "../assets/khm-tutoring-tutor-david-jones.png";
import alecImage from "../assets/khm-tutoring-tutor-alec-wong.png";
import aizenImage from "../assets/khm-tutoring-tutor-aizen-chung.png";
import shweImage from "../assets/khm-tutoring-tutor-shwe-win.png";

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
  {
    name: "Keenan Kim",
    subjects: ["Math", "Calculus"],
    tagline: "Math tutor specializing in learning differences",
    image: keenanImage,
    bio: "Graduate of HBA Highschool currently studying Architectural Engineering at Penn State. Specialized math tutor teaching up to calculus via Zoom, with experience supporting students with dyscalculia, dysgraphia, and other learning differences.",
    achievements: [
      "Graduated from HBA Highschool",
      "Currently studying Architectural Engineering at Penn State",
      "Specializes in math tutoring up to calculus level",
      "Experience working with students with dyscalculia and dysgraphia",
      "Provides online tutoring via Zoom for flexible scheduling"
    ],
    experience: "Math tutor",
    certifications: "HBA Highschool, Penn State (Architectural Engineering)",
    funFact: "Currently studying Architectural Engineering at Penn State",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "Colton Inamine",
    subjects: ["Math"],
    tagline: "Hard worker dedicated to quality teaching",
    image: coltonImage,
    bio: "Graduate of Iolani School currently studying Electrical Computer Engineering at UH Manoa. Very hard worker, dedicated to quality teaching and understanding of mathematical topics.",
    achievements: [
      "Graduated from Iolani School",
      "Currently studying Electrical Computer Engineering at UH Manoa",
      "Dedicated to quality teaching and understanding of mathematical topics",
      "Very hard worker with passion for education"
    ],
    experience: "Math tutor",
    certifications: "Iolani School, UH Manoa (Electrical Computer Engineering)",
    funFact: "Enjoys volleyball and traveling",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "David Jones",
    subjects: ["Econ", "Math", "SAT/ACT"],
    tagline: "Patience, clarity, understanding over memory",
    image: davidImage,
    bio: "Graduate of University of Connecticut with a double major in Math and Economics. Experience as a TA and tutor, currently a substitute teacher for Hawaii DOE. Believes in patience, clarity, and understanding over memory.",
    achievements: [
      "Graduate of University of Connecticut",
      "Double majored in Math and Economics",
      "Experience as a TA and tutor",
      "Substitute teacher for Hawaii DOE",
      "Enjoys helping students connect abstract concepts to real world"
    ],
    experience: "TA, Tutor, Substitute Teacher",
    certifications: "University of Connecticut (Math and Economics)",
    funFact: "Passionate about basketball, sports, teamwork, discipline, and love for learning",
    grades: "9-12",
    category: "Test Prep",
  },
  {
    name: "Alec Wong",
    subjects: ["Math", "English"],
    tagline: "Punahou Junior with future med school goals",
    image: alecImage,
    bio: "Punahou Junior, artist, with future med school goals. Good with kids and patient, specializing in Math and English tutoring.",
    achievements: [
      "Punahou Junior",
      "Artist",
      "Future med school goals",
      "Good with kids and patient",
      "Specializes in Math and English"
    ],
    experience: "Tutor",
    certifications: "Punahou School",
    funFact: "Artist with future med school goals",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "Aizen Chung",
    subjects: ["Math", "Physics"],
    tagline: "Iolani Graduate and Provost Achievement Scholar",
    image: aizenImage,
    bio: "Iolani Graduate, currently a UHM Electrical Computer Engineering student. Founder of Web Design Agency Sondr Designs, co-founder of a startup - Blend Cafe app. Current Provost Achievement Scholar at UHM. Passionate about teaching Math and Physics.",
    achievements: [
      "Iolani Graduate",
      "Current UHM Electrical Computer Engineering student",
      "Founder of Web Design Agency Sondr Designs",
      "Co-founder of startup - Blend Cafe app",
      "Current Provost Achievement Scholar at UHM",
      "Passion for teaching"
    ],
    experience: "Tutor",
    certifications: "Iolani School, UHM (Electrical Computer Engineering)",
    funFact: "Loves coffee, the gym, and learning",
    grades: "9-12",
    category: "Math",
  },
  {
    name: "Shwe Win",
    subjects: ["Science", "Chemistry", "Biology", "College Counseling", "Essay Writing"],
    tagline: "Harvard Magna Cum Laude | Fulbright Scholar | Neuroscience & Global Health",
    image: shweImage,
    bio: "Harvard graduate with a 3.97 GPA and Highest Honors in Neuroscience. Founder of Kūlia College Pathways, a nonprofit that has guided 140+ Hawaii students into top universities including Stanford, Princeton, and Harvard. Passionate about personalized mentorship and helping students reach their full potential.",
    achievements: [
      "Harvard University — B.A. Neuroscience, Magna Cum Laude with Highest Honors (GPA: 3.957)",
      "Fulbright Scholar, U.S. Department of State (2025)",
      "Founded Kūlia College Pathways, serving 140+ students and 100+ volunteer mentors",
      "Harvard Teaching Assistant & Academic Coach for Introductory Chemistry and Life Sciences",
      "Undergraduate researcher on neural encoding and cardiac interoception at Harvard MCB"
    ],
    experience: "Since 2023",
    certifications: "Harvard University, Fulbright Scholar",
    funFact: "Founder of a college access nonprofit recognized by Hawaii Governor Josh Green",
    grades: "K-12, College Prep",
    category: "College Counseling",
  },
];

const Educators = memo(() => {
  const [selectedEducator, setSelectedEducator] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleEducatorClick = useCallback((index: number) => {
    setSelectedEducator(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEducator(null);
  }, []);

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
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-3 md:mb-4 text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
              Meet Our{" "}
              <span className="text-gradient font-bold">
                Expert Educators
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Experienced, passionate tutors in Hawaii and Honolulu dedicated to your child's success. Serving students across Oahu and all of Hawaii.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 md:py-6 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => handleFilterChange(subject)}
                className={cn(
                  "px-6 py-2 rounded-full transition-all duration-300",
                  activeFilter === subject
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-primary/10 border border-border"
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
            {filteredEducators.map((educator, index) => {
              const originalIndex = educators.findIndex(e => e.name === educator.name);
              return (
              <button
                key={educator.name}
                onClick={() => handleEducatorClick(originalIndex)}
                className="relative min-h-[380px] flex flex-col group animate-fade-in rounded-3xl overflow-hidden border-2 border-border shadow-lg bg-card hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer text-left"
                style={{ animationDelay: `${index * 0.1}s`, willChange: 'transform' }}
              >
                <div className="relative aspect-[3/4] min-h-44 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={educator.image}
                    alt={`${educator.name} - Expert tutor in Hawaii and Honolulu specializing in ${educator.subjects.join(', ')}`}
                    className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300"
                    style={{ willChange: 'transform', transform: 'translateZ(0)', contain: 'layout style paint' }}
                    loading="lazy"
                    width={300}
                    height={400}
                    decoding="async"
                    fetchPriority={index < 6 ? "high" : "low"}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Educator Detail Modal */}
      {selectedEducator !== null && (() => {
        const educator = educators[selectedEducator];
        if (!educator) return null;
        return (
          <Dialog open={selectedEducator !== null} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
              <DialogHeader className="sr-only">
                <DialogTitle>{educator.name}</DialogTitle>
                <DialogDescription>Full bio and details for {educator.name}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-0">
                {/* Educator Image - fills the card space */}
                <div className="relative w-full rounded-t-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="flex items-center justify-center w-full aspect-[3/4] min-h-[400px] max-h-[500px]">
                    <img
                      src={educator.image}
                      alt={`${educator.name} - Expert tutor in Hawaii and Honolulu`}
                      className="w-[90%] h-[90%] object-contain"
                      loading="eager"
                      width={600}
                      height={800}
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-white text-2xl md:text-3xl font-heading font-bold mb-1 drop-shadow-lg">
                      {educator.name}
                    </h2>
                    <p className="text-white text-lg mb-1 drop-shadow-lg">
                      {educator.subjects.join(" • ")}
                    </p>
                    <p className="text-white/90 italic drop-shadow-lg">
                      "{educator.tagline}"
                    </p>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 space-y-6">

                {/* Bio */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {educator.bio}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Experience</span>
                    </div>
                    <p className="text-muted-foreground">{educator.experience}</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Grades</span>
                    </div>
                    <p className="text-muted-foreground">{educator.grades}</p>
                  </div>
                </div>

                {/* Achievements */}
                {educator.achievements && (
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block mb-2">Achievements</span>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {educator.achievements.map((achievement, idx) => (
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
                      <p className="text-muted-foreground">{educator.certifications}</p>
                    </div>
                  </div>
                </div>

                {/* Fun Fact */}
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                  <p className="text-center">
                    <span className="font-semibold">Fun Fact:</span>{" "}
                    <span className="text-muted-foreground italic">{educator.funFact}</span>
                  </p>
                </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}
    </main>
  );
});

export default Educators;