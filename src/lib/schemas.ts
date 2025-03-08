import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  timeline: z.string().min(1, "Timeline is required"),
  message: z.string().min(10, "Project details must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
