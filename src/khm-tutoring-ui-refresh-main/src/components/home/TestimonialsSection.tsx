import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent of 10th grader",
    content: "KHM Tutoring transformed my daughter's confidence in math. She went from struggling with algebra to acing her tests. The personalized attention made all the difference!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Parent of 8th grader",
    content: "Outstanding SAT prep! My son improved his score by 150 points. The tutors are patient, knowledgeable, and really know how to connect with students.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "High School Senior",
    content: "Thanks to KHM, I got into my dream college! The AP prep was thorough and the essay help was invaluable. I can't recommend them enough.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Parent of 6th grader",
    content: "The flexible scheduling and online options made tutoring so convenient for our busy family. My son actually looks forward to his sessions now!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What Our Students & Parents Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from real families
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-xl text-foreground/90 mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-heading font-bold text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-border/80"
                )}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have a review to share?
          </p>
          <button className="text-primary font-semibold hover:underline">
            Log in to post your review
          </button>
        </div>
      </div>
    </section>
  );
};
