import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface ContactFormEmailProps {
  name: striny;
  email: string;
  company?: string;
  timeline: string;
  message: string;
}

export default function ContactFormEmail({
  name,
  email,
  company,
  timeline,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New Contact Form Submission from {name}
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-5">
            <Heading className="text-2xl font-bold text-gray-900 mb-6">
              New Contact Form Submission
            </Heading>

            <Section className="mb-6">
              <Text className="text-gray-700 mb-1">
                <strong>From:</strong> {name}
              </Text>
              <Text className="text-gray-700 mb-1">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-gray-700 mb-1">
                <strong>Company:</strong> {company || "Not provided"}
              </Text>
              <Text className="text-gray-700">
                <strong>Timeline:</strong> {timeline}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Section>
              <Heading as="h3" className="text-lg font-semibold mb-3">
                Message:
              </Heading>
              <Text className="text-gray-700 whitespace-pre-wrap">
                {message}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-sm text-gray-500">
              This email was sent from the contact form on auth-starterpack.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
