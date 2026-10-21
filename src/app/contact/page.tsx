import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for software engineering projects.`,
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <FadeIn direction="left">
          <SectionHeading
            eyebrow="Contact"
            title="Let's discuss your project"
            description="Share goals, constraints, and timeline for a useful reply."
          />
          <ul className="space-y-2 text-sm text-[#A6AFBF]">
            <li>
              Email:{" "}
              <a
                className="text-[#35D6FF] hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="text-[#35D6FF] hover:underline" href={siteConfig.phoneTel}>
                {siteConfig.phone}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                className="text-[#35D6FF] hover:underline"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.whatsapp}
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                className="text-[#35D6FF] hover:underline"
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/faheem74
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                className="text-[#35D6FF] hover:underline"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                faheem-bilal-dev
              </a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href={siteConfig.whatsappUrl} external variant="outline">
              Chat on WhatsApp
            </Button>
            <Button href="/assistant" variant="ghost">
              AI Assistant
            </Button>
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.08}>
          <div className="rounded-2xl border border-white/10 bg-[#111722]/80 p-5 sm:p-6">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
