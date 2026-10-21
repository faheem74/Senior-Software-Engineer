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
  return (
    <div
      className={cn("relative overflow-hidden rounded-full ring-2 ring-[#7C5CFF]/40", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={siteConfig.profileImage}
        alt={`${siteConfig.name} professional portrait`}
        width={size}
        height={size}
        className="h-full w-full object-cover object-[center_12%]"
        priority
      />
    </div>
  );
}
