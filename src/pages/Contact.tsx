import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <main className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold">
              Get in{" "}
              <span className="text-gradient font-bold">
                Touch
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Schedule a session or ask us anything about our courses
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left - Contact Info */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div>
                <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl">
                  Let's Start Your Learning Journey
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Whether you're looking to boost grades, prep for tests, or build confidence, we're here to help. Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-base md:text-lg font-semibold">Email</h3>
                    <p className="text-sm md:text-base text-muted-foreground break-all">khmtutoring1@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border">
                  <div className="p-2 md:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base md:text-lg font-semibold">Office Hours</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Monday – Friday: 3 pm – 9 pm<br />
                      Saturday – Sunday: 10 am – 10 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <form className="bg-card rounded-2xl md:rounded-3xl shadow-xl border border-border p-6 md:p-8 space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm md:text-base">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm md:text-base">Student Grade</Label>
                  <Input
                    id="grade"
                    placeholder="e.g., 10th Grade"
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm md:text-base">Subject / Area of Interest *</Label>
                  <Select required>
                    <SelectTrigger className="h-11 md:h-12">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="k12">K-12 General</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="ap">AP Subjects</SelectItem>
                      <SelectItem value="sat">SAT Prep</SelectItem>
                      <SelectItem value="ssat">SSAT Prep</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm md:text-base">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your learning goals and how we can help..."
                    required
                    className="min-h-[100px] md:min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 py-5 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Submit Inquiry
                </Button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  We'll respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;