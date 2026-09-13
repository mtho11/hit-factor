export type PowerFactor = 'minor' | 'major'

export interface Stage {
  id: string
  name: string
  powerFactor: PowerFactor
  time: number
  a: number
  c: number
  d: number
  misses: number
  noShoots: number
  procedurals: number
}

export type CounterField = 'a' | 'c' | 'd' | 'misses' | 'noShoots' | 'procedurals'
