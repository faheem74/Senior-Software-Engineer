import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-sky-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-50">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-slate-400">
        That route doesn&apos;t exist. Head back to the homepage or browse
        verified projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/projects" variant="outline">
          View projects
        </Button>
      </div>
    </div>
  );
}
