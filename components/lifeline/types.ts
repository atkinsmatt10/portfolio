import type { CompanyIconId } from "./company-icon"

export interface LifelineCompany {
  id: CompanyIconId
  name: string
}

export type LifelineEventSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string }

export interface LifelinePhoto {
  src: string
  alt: string
  /** 0..1 across the marker's slot; defaults to a seeded scatter. */
  x?: number
  /** Pixels below the rail; defaults to a seeded scatter. */
  y?: number
  /** Degrees; defaults to a seeded tilt. */
  rotate?: number
  /** Card width in pixels. Default 180. */
  width?: number
}

export type LifelineEvent = string | LifelineEventSegment[]

export interface LifelineMarker {
  id: string
  year: number
  events: LifelineEvent[]
  photos?: LifelinePhoto[]
  companies?: LifelineCompany[]
}

/**
 * How the timeline relates to the page around it.
 *
 * - `"page"` — the Lifeline *is* the page. It owns the wheel and the
 *   arrow keys, and nothing scrolls behind it.
 * - `"embed"` — the Lifeline is one module in a scrolling page. Wheel
 *   over it scrubs the rail, and at either end of the rail the wheel is
 *   handed back so the page carries on scrolling.
 * - `"auto"` — measured at runtime: page mode only when the timeline
 *   covers most of the viewport *and* there is nothing behind it left to
 *   scroll. Anything else is treated as embedded.
 */
export type LifelineMode = "auto" | "page" | "embed"

export interface LifelineProps {
  markers: LifelineMarker[]
  birthYear: number
  className?: string
  title?: string
  mode?: LifelineMode
}
