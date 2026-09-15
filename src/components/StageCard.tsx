import { useRef, useState } from 'react'
import type { CounterField, Stage } from '../types'
import { calculateHitFactor, calculateTotalPoints } from '../scoring'
import Counter from './Counter'

interface StageCardProps {
  stage: Stage
  onUpdate: (updates: Partial<Stage>) => void
  onRemove: () => void
  canRemove: boolean
}

const COUNTER_ROWS: { field: CounterField; label: string }[] = [
  { field: 'a', label: 'A' },
  { field: 'c', label: 'C' },
  { field: 'd', label: 'D' },
  { field: 'misses', label: 'Misses' },
  { field: 'noShoots', label: 'No Shoots' },
  { field: 'procedurals', label: 'Procedurals' },
]

export default function StageCard({ stage, onUpdate, onRemove, canRemove }: StageCardProps) {
  const totalPoints = calculateTotalPoints(stage)
  const hitFactor = calculateHitFactor(stage)
  const [isEditingName, setIsEditingName] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  function startEditingName() {
    setIsEditingName(true)
    requestAnimationFrame(() => nameInputRef.current?.select())
  }

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg bg-gray-100 shadow-md">
      <div className="flex items-center justify-between bg-blue-800 px-6 py-5">
        {isEditingName ? (
          <input
            ref={nameInputRef}
            value={stage.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
            className="w-full bg-transparent text-center text-2xl text-white placeholder-blue-200 outline-none"
            aria-label="Stage name"
          />
        ) : (
          <button
            type="button"
            onClick={startEditingName}
            className="flex w-full items-center justify-center gap-2 text-center text-2xl text-white"
          >
            <span className="truncate">{stage.name}</span>
            <span aria-hidden className="shrink-0 text-lg text-blue-200 hover:text-white">
              ✎
            </span>
          </button>
        )}
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-3 shrink-0 text-blue-200 hover:text-white"
            aria-label="Remove stage"
          >
            &times;
          </button>
        )}
      </div>

      <div className="px-6 py-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-1 font-semibold text-gray-800">
              <span aria-hidden>⚡</span> Power Factor
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 text-gray-700">
                <input
                  type="radio"
                  name={`power-factor-${stage.id}`}
                  checked={stage.powerFactor === 'minor'}
                  onChange={() => onUpdate({ powerFactor: 'minor' })}
                  className="h-4 w-4 accent-indigo-600"
                />
                Minor
              </label>
              <label className="flex items-center gap-1.5 text-gray-700">
                <input
                  type="radio"
                  name={`power-factor-${stage.id}`}
                  checked={stage.powerFactor === 'major'}
                  onChange={() => onUpdate({ powerFactor: 'major' })}
                  className="h-4 w-4 accent-indigo-600"
                />
                Major
              </label>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-1 font-semibold text-gray-800">
              <span aria-hidden>⏱</span> Time
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={stage.time}
              onChange={(e) => onUpdate({ time: Math.max(0, Number(e.target.value)) })}
              className="w-24 rounded border border-indigo-400 px-2 py-1 text-lg outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {COUNTER_ROWS.map(({ field, label }) => (
            <Counter
              key={field}
              label={label}
              value={stage[field]}
              onChange={(value) => onUpdate({ [field]: value })}
            />
          ))}
        </div>

        <div className="mt-4 text-xl font-bold text-gray-900">
          Points: {totalPoints}
        </div>
        <div className="text-2xl font-bold text-gray-900">
          Hit Factor: {hitFactor.toFixed(4)}
        </div>
      </div>
    </div>
  )
}
