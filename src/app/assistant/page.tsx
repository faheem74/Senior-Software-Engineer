import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AssistantOpenHint } from "@/components/chat/AssistantOpenHint";

export const metadata: Metadata = {
  title: "Faheem AI — Portfolio Assistant",
  description:
    "Ask Faheem AI about verified skills, experience, projects, demos, and contact options.",
};

export default function AssistantPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="AI Assistant"
        title="Faheem AI — Portfolio Assistant"
        description="A grounded assistant for recruiters and clients. It answers from verified portfolio knowledge only. Without an AI API key it uses knowledge fallback mode — clearly labeled in the chat header after your first reply."
      />
      <AssistantOpenHint />
      <div className="mx-auto max-w-2xl">
        <ChatWidget embedded initiallyOpen />
      </div>
    </Section>
  );
}
