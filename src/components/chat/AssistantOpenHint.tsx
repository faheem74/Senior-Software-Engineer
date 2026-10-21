export function AssistantOpenHint() {
  return (
    <p className="mb-6 max-w-2xl text-sm text-slate-400">
      You can also open Faheem AI from the floating button on any page. Configure{" "}
      <code className="rounded bg-[#142238] px-1.5 py-0.5 text-sky-300">
        AI_PROVIDER
      </code>{" "}
      and{" "}
      <code className="rounded bg-[#142238] px-1.5 py-0.5 text-sky-300">
        AI_API_KEY
      </code>{" "}
      for live LLM replies; otherwise verified FAQ fallback is used.
    </p>
  );
}
