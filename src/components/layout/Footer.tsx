import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080A0F]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-[#F5F7FA]">{siteConfig.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#A6AFBF]">
            {siteConfig.title}
          </p>
          <p className="mt-2 text-sm text-[#7A8499]">{siteConfig.roleNote}</p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#35D6FF]">
            Navigate
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[#A6AFBF] transition hover:text-[#F5F7FA]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#35D6FF]">
            Contact
          </p>
          <ul className="mt-2.5 space-y-1.5 text-sm text-[#A6AFBF]">
            <li>
              <a className="hover:text-[#F5F7FA]" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#F5F7FA]"
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#F5F7FA]"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#F5F7FA]"
                href={siteConfig.vercel}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-[#7A8499]">
        © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
      </div>
    </footer>
  );
}
