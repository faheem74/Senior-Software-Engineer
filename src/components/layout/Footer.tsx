import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-500/15 bg-[#070B14]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-50">{siteConfig.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            {siteConfig.title}
          </p>
          <p className="mt-2 text-sm text-slate-500">{siteConfig.positioning}</p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-400">
            Navigate
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-slate-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-400">
            Contact
          </p>
          <ul className="mt-2.5 space-y-1.5 text-sm text-slate-400">
            <li>
              <a
                className="hover:text-slate-100"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-slate-100"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {siteConfig.whatsapp}
              </a>
            </li>
            <li>
              <a
                className="hover:text-slate-100"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-500/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
      </div>
    </footer>
  );
}
