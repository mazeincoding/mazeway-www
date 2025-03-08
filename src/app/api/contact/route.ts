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
    // Apply rate limiting if enabled
    if (apiRateLimit) {
      const ip = getClientIp(request);
      const { success, limit, reset } = await apiRateLimit.limit(ip);

      if (!success) {
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
    const validatedData = contactFormSchema.parse(body);

    // Render email template
    const emailHtml = await render(ContactFormEmail(validatedData));

    // Send email using Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_FORM_RECIPIENT_EMAIL!,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
