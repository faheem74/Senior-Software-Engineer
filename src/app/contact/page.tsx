import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for software engineering projects.`,
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's discuss your project"
            description="Share enough context for a useful reply — goals, constraints, and timeline."
          />
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              Email:{" "}
              <a
                className="text-sky-300 hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="text-sky-300 hover:underline" href={siteConfig.phoneTel}>
                {siteConfig.phone}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                className="text-sky-300 hover:underline"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.whatsapp}
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                className="text-sky-300 hover:underline"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                faheem-bilal-dev
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={siteConfig.whatsappUrl} external variant="outline">
              Chat on WhatsApp
            </Button>
            <Button href={siteConfig.linkedin} external variant="ghost">
              LinkedIn
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-500/15 bg-[#101A2B]/70 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
