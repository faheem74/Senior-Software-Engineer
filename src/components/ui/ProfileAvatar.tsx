import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function ProfileAvatar({
  className,
  size = 160,
}: {
  className?: string;
  size?: number;
}) {
  if (siteConfig.profileImage) {
    return (
      <Image
        src={siteConfig.profileImage}
        alt={`${siteConfig.name} professional portrait`}
        width={size}
        height={size}
        className={cn(
          "rounded-2xl object-cover ring-1 ring-slate-500/30",
          className,
        )}
        priority
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#142238] via-[#101A2B] to-[#0B1220] ring-1 ring-slate-500/30",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={`${siteConfig.name} initials avatar placeholder`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(52,211,153,0.2),transparent_50%)]" />
      <span className="relative font-semibold tracking-tight text-slate-50" style={{ fontSize: size * 0.28 }}>
        FB
      </span>
    </div>
  );
}
