import { useEffect, useState } from 'react'
import type { Stage } from '../types'

const STORAGE_KEY = 'hit-factor:stages'

function createStage(name: string): Stage {
  return {
    id: crypto.randomUUID(),
    name,
    powerFactor: 'minor',
    time: 0,
    a: 0,
    c: 0,
    d: 0,
    misses: 0,
    noShoots: 0,
    procedurals: 0,
  }
}

function loadStages(): Stage[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return [createStage('Stage 1')]
  try {
    const parsed = JSON.parse(raw) as Stage[]
    return parsed.length > 0 ? parsed : [createStage('Stage 1')]
  } catch {
    return [createStage('Stage 1')]
  }
}

export function useStages() {
  const [stages, setStages] = useState<Stage[]>(loadStages)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stages))
  }, [stages])

  function addStage() {
    setStages((prev) => [...prev, createStage(`Stage ${prev.length + 1}`)])
  }

  function duplicateStage(id: string) {
    setStages((prev) => {
      const index = prev.findIndex((s) => s.id === id)
      if (index === -1) return prev
      const source = prev[index]
      const copy: Stage = { ...source, id: crypto.randomUUID(), name: `${source.name} Copy` }
      return [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)]
    })
  }

  function removeStage(id: string) {
    setStages((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev))
  }

  function updateStage(id: string, updates: Partial<Stage>) {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  return { stages, addStage, duplicateStage, removeStage, updateStage }
}
