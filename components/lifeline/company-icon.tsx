import type { ComponentType } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export type CompanyIconId = string

interface CompanyIconEntry {
  icon: ComponentType<{ className?: string }>
  /** Tailwind size for the mark — wordmarks want a wide box. */
  sizeClassName?: string
}

function PennStateMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/timeline/logos/penn-state.png"
        alt=""
        width={280}
        height={111}
        className={cn("object-contain object-left dark:hidden", className)}
        aria-hidden="true"
      />
      <Image
        src="/timeline/logos/penn-state-reverse.png"
        alt=""
        width={200}
        height={79}
        className={cn(
          "hidden object-contain object-left dark:block",
          className,
        )}
        aria-hidden="true"
      />
    </>
  )
}

function ComcastMark({ className }: { className?: string }) {
  return (
    <Image
      src="/timeline/logos/comcast.svg"
      alt=""
      width={512}
      height={206}
      className={cn(
        "object-contain object-left dark:brightness-0 dark:invert",
        className,
      )}
      aria-hidden="true"
    />
  )
}

function SmartRentMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/timeline/logos/smartrent.svg"
        alt=""
        width={64}
        height={54}
        className={cn("object-contain object-left dark:hidden", className)}
        aria-hidden="true"
      />
      <Image
        src="/timeline/logos/smartrent-reverse.svg"
        alt=""
        width={64}
        height={54}
        className={cn(
          "hidden object-contain object-left dark:block",
          className,
        )}
        aria-hidden="true"
      />
    </>
  )
}

function TeamNateShark({ className }: { className?: string }) {
  return (
    <Image
      src="/timeline/logos/team-nate-shark.png"
      alt=""
      width={320}
      height={312}
      className={cn("object-contain object-left", className)}
      aria-hidden="true"
    />
  )
}

const registry: Record<string, CompanyIconEntry> = {
  "penn-state": {
    icon: PennStateMark,
    sizeClassName: "h-9 w-[6.5rem]",
  },
  comcast: {
    icon: ComcastMark,
    sizeClassName: "h-7 w-[4.75rem]",
  },
  smartrent: {
    icon: SmartRentMark,
    sizeClassName: "h-7 w-8",
  },
  "team-nate": {
    icon: TeamNateShark,
    sizeClassName: "h-9 w-9",
  },
}

export function CompanyIcon({
  id,
  label,
  className,
}: {
  id: CompanyIconId
  label: string
  className?: string
}) {
  const entry = registry[id]

  if (entry) {
    const Icon = entry.icon
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center text-black transition-colors duration-300 dark:text-white",
          entry.sizeClassName ?? "h-4 w-4",
          className,
        )}
        aria-label={label}
        title={label}
      >
        <Icon className="h-full w-full" />
      </span>
    )
  }

  return (
    <span
      title={label}
      aria-label={label}
      className={cn(
        "inline-flex h-5 w-5 select-none items-center justify-center rounded-full text-[10px] font-semibold uppercase leading-none ring-1 ring-current/30",
        className,
      )}
    >
      {label.charAt(0)}
    </span>
  )
}
