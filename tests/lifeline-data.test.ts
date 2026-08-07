import assert from "node:assert/strict"
import test from "node:test"

import { mattTimeline } from "../lib/lifeline-data"

test("timeline markers are ordered and uniquely identified", () => {
  const years = mattTimeline.map(({ year }) => year)
  const ids = mattTimeline.map(({ id }) => id)

  assert.deepEqual(years, [...years].sort((a, b) => a - b))
  assert.equal(new Set(ids).size, ids.length)
})

test("timeline spans Matt's life from 1993 through 2026", () => {
  assert.equal(mattTimeline.at(0)?.year, 1993)
  assert.equal(mattTimeline.at(-1)?.year, 2026)
})

test("timeline only references the two selected feature photos", () => {
  const photoSources = mattTimeline.flatMap(
    ({ photos = [] }) => photos.map(({ src }) => src),
  )

  assert.deepEqual(photoSources, [
    "/timeline/team-nate-shirt.png",
    "/timeline/virtual-intercom.jpg",
  ])
})
