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
    <Image
      src={siteConfig.profileImage}
      alt={`${siteConfig.name} professional portrait`}
      width={size}
      height={size}
      className={cn(
        "rounded-2xl object-cover object-[center_20%] ring-1 ring-white/15",
        className,
      )}
      priority
    />
  );
}
