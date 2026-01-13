import { useState, useRef } from "react";
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
import { Mail, Clock, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    school: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // EmailJS configuration
      // Get your credentials from https://www.emailjs.com/
      // See EMAILJS_SETUP.md for detailed setup instructions
      // For production, use environment variables:
      // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
      
      // Check if EmailJS is configured
      if (serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
        throw new Error("EmailJS is not configured. Please set up your EmailJS credentials. See EMAILJS_SETUP.md for instructions.");
      }

      const templateParams = {
        to_email: "khmtutoring1@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        grade: formData.grade || "Not provided",
        school: formData.school || "Not provided",
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Store the name before resetting
      setSubmittedName(formData.name);
      setSubmitStatus("success");
      setShowSuccessDialog(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        school: "",
        subject: "",
        message: "",
      });
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
              Get in{" "}
              <span className="text-gradient font-bold">
                Touch
              </span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Contact KHM Tutoring in Hawaii and Honolulu. Schedule a session or ask us anything about our tutoring services. Serving students across Oahu and all of Hawaii.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left - Contact Info */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div>
                <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl">
                  Let's Start Your Learning Journey
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Whether you're looking to boost grades, prep for tests, or build confidence, our Hawaii tutors are here to help. Serving Honolulu, Oahu, and all of Hawaii. Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl border border-border" style={{ backgroundColor: '#DBEAFE' }}>
                  <div 
                    className="p-1.5 md:p-2 rounded-lg flex-shrink-0" 
                    style={{ backgroundColor: '#DBEAFE' }}
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="mb-0.5 text-sm md:text-base font-semibold">Email</h3>
                    <p className="text-xs md:text-sm text-muted-foreground break-all">khmtutoring1@gmail.com</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl border border-border" style={{ backgroundColor: '#DBEAFE' }}>
                  <div 
                    className="p-1.5 md:p-2 rounded-lg flex-shrink-0" 
                    style={{ backgroundColor: '#DBEAFE' }}
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="mb-0.5 text-sm md:text-base font-semibold">Phone</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">(808) 381-7856</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl border border-border" style={{ backgroundColor: '#DBEAFE' }}>
                  <div 
                    className="p-1.5 md:p-2 rounded-lg flex-shrink-0" 
                    style={{ backgroundColor: '#DBEAFE' }}
                  >
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="mb-0.5 text-sm md:text-base font-semibold">Office Hours</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      9am-10pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl md:rounded-3xl shadow-xl border border-border p-6 md:p-8 space-y-5 md:space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm md:text-base">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm md:text-base">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(808) 123-4567"
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm md:text-base">Student Grade</Label>
                  <Input
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="e.g., 10th Grade"
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school" className="text-sm md:text-base">School (Optional)</Label>
                  <Input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="e.g., Punahou School, Iolani School"
                    className="h-11 md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm md:text-base">Subject / Area of Interest *</Label>
                  <Select required value={formData.subject} onValueChange={handleSelectChange}>
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your learning goals and how we can help..."
                    required
                    className="min-h-[100px] md:min-h-[120px] resize-none"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Sorry, there was an error sending your message. Please try again or email us directly at khmtutoring1@gmail.com
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 py-5 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>

                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  We'll respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Confirmation Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Thank you for contacting us{submittedName ? `, ${submittedName}` : ""}! We've received your message and will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Contact;