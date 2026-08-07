import type { LifelineMarker } from "./types"

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function hasMarkerContent(marker: LifelineMarker) {
  return (
    marker.events.length > 0 ||
    (marker.companies?.length ?? 0) > 0
  )
}

export function getMarkerHeight(marker: LifelineMarker, nextYear?: number) {
  const hasContent = hasMarkerContent(marker)

  if (!hasContent) return 48

  let height = 96

  if (marker.companies?.length) height += 28
  height += marker.events.length * 44

  if (!nextYear) return Math.min(520, Math.max(188, height))

  const gap = Math.max(1, nextYear - marker.year)
  height += Math.min(32, gap * 3)

  return Math.min(520, Math.max(188, height))
}

export function getMarkerWidth(marker: LifelineMarker, nextYear?: number) {
  const hasContent = hasMarkerContent(marker)

  if (!nextYear) return hasContent ? 360 : 80
  if (!hasContent) return 80

  const gap = Math.max(1, nextYear - marker.year)
  return Math.min(420, Math.max(290, gap * 36))
}
