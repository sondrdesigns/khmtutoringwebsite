import { Award, Clock, Heart, Target } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Experienced Educators",
    description: "Certified teachers with years of tutoring experience across all subjects",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Custom learning plans tailored to each student's unique needs and goals",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Sessions that fit your busy family schedule, online or in-person",
  },
  {
    icon: Heart,
    title: "Proven Results",
    description: "Track record of improved grades, test scores, and student confidence",
  },
];

export const MissionSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Mission */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Empowering Students to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Reach Their Full Potential
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At KHM Tutoring, we believe every student deserves personalized attention and the tools to succeed. Our mission is to build confidence, foster critical thinking, and create a solid academic foundation that lasts a lifetime.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with families to provide exceptional one-on-one instruction that adapts to each student's learning style, helping them not just understand concepts, but truly master them.
            </p>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
