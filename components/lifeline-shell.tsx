import type { HTMLAttributes, ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const CONTAINER = "mx-auto flex w-full max-w-[1600px] items-center px-5 md:px-8"

export function LifelineShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh min-h-[32rem] flex-col overflow-hidden bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      {children}
    </div>
  )
}

export function LifelineNav({
  children,
  className,
  logo,
}: {
  children?: ReactNode
  className?: string
  logo: ReactNode
}) {
  return (
    <header className={cn("relative z-30 h-[4.5rem] shrink-0", className)}>
      <div
        data-site-nav-inner=""
        className={cn(CONTAINER, "h-full justify-between border-b border-zinc-200/80 dark:border-zinc-800")}
      >
        <Link
          data-site-nav-logo=""
          href="/"
          className="group inline-flex min-h-11 items-center gap-3 text-black dark:text-white"
        >
          {logo}
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">{children}</div>
      </div>
    </header>
  )
}

export function LifelineStage({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("min-h-0 flex-1 overflow-y-auto md:overflow-hidden", className)}
      {...props}
    />
  )
}

export function LifelineFooter({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <footer className={cn("relative z-30 h-14 shrink-0", className)}>
      <div className={cn(CONTAINER, "h-full justify-between border-t border-zinc-200/80 text-[11px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400")}>
        {children}
      </div>
    </footer>
  )
}
