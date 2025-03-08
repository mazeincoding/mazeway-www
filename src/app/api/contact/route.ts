import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ContactFormEmail from "@emails/contact-form";
import { render } from "@react-email/render";
import { apiRateLimit, getClientIp } from "@/utils/rate-limit";
import { contactFormSchema } from "@/lib/schemas";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Starting contact form submission process...");

    // Apply rate limiting if enabled
    if (apiRateLimit) {
      const ip = getClientIp(request);
      console.log("🔒 Rate limiting check for IP:", ip);
      const { success, limit, reset } = await apiRateLimit.limit(ip);

      if (!success) {
        console.log("⛔ Rate limit exceeded for IP:", ip);
        return NextResponse.json(
          {
            error: "Too many requests",
            limit,
            reset: new Date(reset).toISOString(),
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Reset": new Date(reset).toISOString(),
            },
          }
        );
      }
    }

    // Parse and validate the request body
    const body = await request.json();
    console.log("📝 Received form data:", {
      ...body,
      // Redact email for privacy in logs
      email: body.email
        ? `${body.email.slice(0, 3)}...${body.email.slice(-8)}`
        : undefined,
    });

    const validatedData = contactFormSchema.parse(body);
    console.log("✅ Form data validation passed");

    // Log email configuration
    console.log("📨 Email configuration:", {
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${validatedData.name}`,
    });

    // Render email template
    const emailHtml = await render(ContactFormEmail(validatedData));
    console.log("📋 Email template rendered successfully");

    // Send email using Resend
    console.log("🚀 Attempting to send email via Resend...");
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_FORM_RECIPIENT_EMAIL!,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    console.log("✉️ Resend API response:", result);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      console.log("📝 Validation error details:", error.errors);
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    // Log additional error details if available
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
