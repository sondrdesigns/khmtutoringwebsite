import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white">
            Ready to Help Your Child Thrive Academically?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join hundreds of families who trust KHM Tutoring for personalized, results-driven education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 group"
            >
              Contact Us
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              <Users className="mr-2" />
              View Educators
            </Button>
          </div>

          <div className="pt-8 flex justify-center gap-8 text-white/80">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm">Students Helped</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-sm">Years Experience</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
