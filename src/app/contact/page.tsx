"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const STORAGE_KEY = "contact_form_data";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  timeline: z.string().min(1, "Timeline is required"),
  message: z.string().min(10, "Project details must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SaveStatus = "error" | "success";

export default function ContactPage() {
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(
    null
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      timeline: "",
      message: "",
    },
  });

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
          form.setValue(key as keyof ContactFormValues, parsedData[key]);
        });
      } catch (error) {
        setSaveError("Failed to load saved data");
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  // Save form data on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSaveError(null);
      } catch (error) {
        setSaveError("Failed to save changes");
        console.error("Error saving form data:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Function to handle form clearing
  const handleClearForm = () => {
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    setShowClearDialog(false);
  };

  const handleDownload = () => {
    if (!submittedData) return;

    const dataStr = JSON.stringify(submittedData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-form-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Clear saved data after successful submission
      localStorage.removeItem(STORAGE_KEY);
      setSubmitSuccess(true);
      setSubmittedData(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col gap-24 px-4 py-24 md:px-8">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Get in touch
            </h1>
            <p className="text-muted-foreground max-w-2xl text-center">
              Fill out the form below to discuss implementing enterprise-grade
              authentication for your application
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-xl mx-auto w-full space-y-8"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 3 months, Q2 2025"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project and authentication needs"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-sm flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      saveError
                        ? "bg-red-500"
                        : submitError
                          ? "bg-red-500"
                          : submitSuccess
                            ? "bg-green-500"
                            : "bg-green-500"
                    }`}
                  />
                  <span
                    className={
                      saveError || submitError
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }
                  >
                    {submitError ||
                      saveError ||
                      (submitSuccess
                        ? "Message sent successfully!"
                        : "Changes saved")}
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowClearDialog(true)}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
                {submitSuccess && submittedData && (
                  <div className="flex justify-center mt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleDownload}
                      className="w-full max-w-sm"
                    >
                      Download Form Details
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>

      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Clear Form Data</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all form data? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowClearDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleClearForm}
            >
              Clear Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
