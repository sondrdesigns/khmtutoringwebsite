import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
      
      {/* Animated shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-semibold">
                ✨ Trusted by 500+ Students
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
              Personalized{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                K-12 Tutoring
              </span>{" "}
              for Success
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Expert instruction in Math, English, and Test Prep. Take it higher with personalized learning that builds confidence and achieves academic excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5"
              >
                View Courses
              </Button>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Students learning together"
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg p-6 border border-border animate-float max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-muted-foreground">Students Helped</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-lg p-6 border border-border animate-float max-w-[200px]" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+15%</p>
                  <p className="text-sm text-muted-foreground">Avg. Improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
