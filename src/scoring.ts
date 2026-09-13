import type { PowerFactor, Stage } from './types'

const PENALTY = 10

const ZONE_VALUES: Record<PowerFactor, { a: number; c: number; d: number }> = {
  major: { a: 5, c: 4, d: 2 },
  minor: { a: 5, c: 3, d: 1 },
}

export function calculateTotalPoints(stage: Stage): number {
  const zone = ZONE_VALUES[stage.powerFactor]
  return (
    stage.a * zone.a +
    stage.c * zone.c +
    stage.d * zone.d -
    stage.noShoots * PENALTY -
    stage.procedurals * PENALTY
  )
}

export function calculateHitFactor(stage: Stage): number {
  if (stage.time <= 0) return 0
  return calculateTotalPoints(stage) / stage.time
}
