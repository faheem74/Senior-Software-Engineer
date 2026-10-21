import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AssistantOpenHint } from "@/components/chat/AssistantOpenHint";
import { ArchitectureFlow } from "@/components/sections/ArchitectureFlow";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Ask Faheem AI about verified skills, experience, projects, demos, and contact options.",
};

export default function AssistantPage() {
  return (
    <>
      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="AI Assistant"
            title="Faheem AI — Portfolio Assistant"
            description="Ask about skills, projects, backend experience, AI/cloud work, or how to contact Faheem. Uses a real server API (Gemini or Groq) when AI_API_KEY is configured; otherwise a verified knowledge fallback."
          />
        </FadeIn>
        <AssistantOpenHint />
        <div className="mx-auto max-w-2xl">
          <ChatWidget embedded initiallyOpen />
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-[#7A8499]">
          API: <code className="text-[#35D6FF]">POST /api/assistant</code> ·
          Keys stay server-side in environment variables · never in the browser
        </p>
      </Section>

      <Section className="bg-[#0D111A]/50">
        <SectionHeading
          eyebrow="Architecture"
          title="How the assistant is wired"
          description="Frontend chat → Next.js API route → optional AI provider → portfolio knowledge."
        />
        <ArchitectureFlow />
        <div className="mt-5">
          <Button href="/contact" variant="outline">
            Prefer email? Contact Faheem
          </Button>
        </div>
      </Section>
    </>
  );
}
