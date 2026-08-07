import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react"

import { Lifeline } from "@/components/lifeline"
import {
  LifelineFooter,
  LifelineNav,
  LifelineShell,
  LifelineStage,
} from "@/components/lifeline-shell"
import { ThemeToggle } from "@/components/theme-toggle"
import { Weather } from "@/components/weather"
import { mattTimeline } from "@/lib/lifeline-data"

const socialLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 px-2 text-zinc-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"

export default function Home() {
  return (
    <LifelineShell>
      <LifelineNav
        logo={
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            Matt Atkins
          </span>
        }
      >
        <ThemeToggle />
      </LifelineNav>

      <LifelineStage>
        <Lifeline
          markers={mattTimeline}
          birthYear={1993}
          title="Matt Atkins professional and personal timeline"
          mode="page"
          className="h-full"
        />
      </LifelineStage>

      <LifelineFooter>
        <div className="flex min-w-0 items-center uppercase tracking-[0.12em]">
          <span className="hidden sm:inline">Philadelphia, Pennsylvania</span>
          <span className="sm:hidden">Philadelphia</span>
          <Weather />
        </div>
        <nav aria-label="Contact Matt Atkins" className="flex items-center gap-1">
          <a
            href="mailto:atkinsmatt10@gmail.com"
            className={socialLinkClass}
            aria-label="Email Matt Atkins"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/atkinsmatthew1/"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
            aria-label="Matt Atkins on LinkedIn"
          >
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/atkinsmatt10"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
            aria-label="Matt Atkins on GitHub"
          >
            <GitBranch className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </LifelineFooter>
    </LifelineShell>
  )
}
