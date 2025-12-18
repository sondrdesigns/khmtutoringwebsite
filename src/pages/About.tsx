import { Button } from "../components/ui/button";
import { Award, Heart, Target, Users, BookOpen, TrendingUp, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Personalized tutoring for all grade levels",
  "Proven improvement in grades, scores, confidence, and motivation",
  "Flexible scheduling and convenient meeting options",
  "Experienced and passionate educators",
];

const About = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-3 md:mb-4 text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
              About{" "}
              <span className="text-gradient font-bold">
                KHM | Expert Tutoring
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Empowering Students to Reach Their Full Potential
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-primary">Our Mission</span>
              </div>
            </div>
            <p className="text-xl text-foreground leading-relaxed text-center">
              At KHM Tutoring, we believe that every student has the ability to succeed with the right tutor match. Our mission is to empower students across Honolulu and all of Hawaii to achieve academic excellence through personalized, one-on-one tutoring with quality educators who truly understand their needs.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Founded by Kody Kim with over 10 years of tutoring experience, KHM Tutoring has built a team of exceptional tutors through a rigorous vetting process. We don't just match students with any tutor—we use our own proven methods to find the perfect fit between each child and their tutor, ensuring a personal connection that leads to real results. Our quality tutors bring expertise, dedication, and a genuine commitment to each student's success.
            </p>
          </div>
        </div>
      </section>

      {/* Story, Team, and Approach - Three Columns */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-4">
              <span className="text-primary">What Makes Us Different</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Our Story */}
            <div 
              className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: "0s" }}
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl">
                Our Story
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                KHM Tutoring began when founder Kody Kim started tutoring in 2016, driven by a vision to create a more personal, quality-focused tutoring experience in Hawaii. Over 10+ years, Kody and his carefully selected team of tutors have developed our own unique methods for matching students with the right tutor—considering not just academic needs, but personality, learning style, and communication preferences. What started as a local Honolulu service has grown into a trusted partner for families across Oahu, built on the foundation of quality tutors and proven results.
              </p>
            </div>

            {/* Our Team */}
            <div 
              className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl">
                Our Team
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                Quality tutors are at the heart of everything we do. Our team consists of experienced educators with 10+ years of combined experience, each carefully selected through our rigorous vetting process. We evaluate not just academic qualifications, but teaching ability, communication skills, personality, and genuine dedication to student success. This strong vetting process ensures that every tutor on our team meets our high standards for quality and personal connection with students.
              </p>
            </div>

            {/* Our Approach */}
            <div 
              className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl">
                Our Approach
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                We've developed our own methods to best fit each child with their ideal tutor. This personal matching process considers academic needs, learning style, personality, and communication preferences. We begin with a thorough assessment to understand each student's strengths, challenges, and goals. From there, we carefully match them with a tutor who not only has the right expertise, but also the right teaching style and personal connection. This personalized approach ensures a productive, comfortable learning experience that leads to real academic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Flexibility */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-6">
              <span className="text-primary">Flexible Learning</span>
            </div>
            <p className="text-xl text-foreground leading-relaxed">
              Whether lessons are held in-home throughout Honolulu and Oahu, at a nearby library, or online, our Hawaii tutors make learning accessible, engaging, and tailored to each student's goals. We serve families across the entire island of Oahu and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
              <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-6">
                <span className="text-primary">The KHM Advantage</span>
              </div>
              <h2 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Why Families{" "}
                <span className="text-gradient font-bold">
                  Choose Us
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of families who trust us to help their students excel
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-8 bg-card rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground leading-relaxed pt-2 text-lg">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-3xl p-12 md:p-16 border border-border shadow-xl">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary">Ready to Get Started?</span>
              </div>
              <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Join{" "}
                <span className="text-gradient font-bold">
                  Us
                </span>
              </h2>
              <p className="text-xl text-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                Whether your child needs support catching up, wants to get ahead, or is preparing for an important exam, KHM Tutoring is here to guide the way.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                Contact us today to schedule a consultation and discover how we can help your student achieve their academic goals.
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;