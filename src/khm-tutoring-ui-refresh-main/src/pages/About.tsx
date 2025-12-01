import { Award, Heart, Target, TrendingUp } from "lucide-react";

const milestones = [
  { year: "2009", event: "KHM Tutoring Founded", description: "Started with a mission to provide personalized education" },
  { year: "2015", event: "500+ Students Milestone", description: "Reached our first major student impact goal" },
  { year: "2018", event: "Online Platform Launch", description: "Expanded to serve families nationwide" },
  { year: "2023", event: "Award Recognition", description: "Named Top Tutoring Service in the region" },
];

const values = [
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand that every student learns differently and faces unique challenges. Our approach is patient, supportive, and tailored to individual needs.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We set high standards for ourselves and our students. Our tutors are experts in their fields, committed to delivering exceptional educational experiences.",
  },
  {
    icon: Target,
    title: "Consistency",
    description: "Success comes from steady progress. We provide reliable, ongoing support that builds confidence and competence over time.",
  },
];

const About = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                KHM Tutoring
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Take it higher — Building foundations for lifelong learning and academic success
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Story */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl font-heading font-bold">
                Founded on the Belief That Every Student Can Excel
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  KHM Tutoring was founded in 2009 by a group of passionate educators who saw a gap in personalized education. They recognized that traditional classroom settings, while valuable, don't always provide the individual attention every student needs to thrive.
                </p>
                <p>
                  What started as a small local tutoring center has grown into a comprehensive educational service, helping hundreds of students across all grade levels achieve their academic goals. Our success comes from our unwavering commitment to understanding each student's unique learning style and adapting our approach accordingly.
                </p>
                <p>
                  Today, we offer both in-person and online tutoring, reaching families across the country. But no matter how much we grow, we never lose sight of our core mission: providing personalized, effective education that builds confidence and fosters a genuine love of learning.
                </p>
              </div>
            </div>

            {/* Right - Timeline */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-heading font-bold mb-8">Our Journey</h3>
              <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-sm font-bold text-primary mb-1">{milestone.year}</div>
                      <h4 className="font-heading font-bold text-lg mb-2">{milestone.event}</h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
