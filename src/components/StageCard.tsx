import { useRef, useState } from 'react'
import type { CounterField, Stage } from '../types'
import { calculateHitFactor, calculateTotalPoints } from '../scoring'
import Counter from './Counter'

interface StageCardProps {
  stage: Stage
  onUpdate: (updates: Partial<Stage>) => void
  onRemove: () => void
  onDuplicate: () => void
  canRemove: boolean
}

const COUNTER_ROWS: { field: CounterField; label: string }[] = [
  { field: 'a', label: 'A' },
  { field: 'c', label: 'C' },
  { field: 'd', label: 'D' },
  { field: 'misses', label: 'Miss' },
  { field: 'noShoots', label: 'NS' },
  { field: 'procedurals', label: 'Proc' },
]

export default function StageCard({
  stage,
  onUpdate,
  onRemove,
  onDuplicate,
  canRemove,
}: StageCardProps) {
  const totalPoints = calculateTotalPoints(stage)
  const hitFactor = calculateHitFactor(stage)
  const [isEditingName, setIsEditingName] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  function startEditingName() {
    setIsEditingName(true)
    requestAnimationFrame(() => nameInputRef.current?.select())
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-chassis p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_0_rgba(0,0,0,0.4)]">
      <div className="mb-3 flex items-center justify-between">
        {isEditingName ? (
          <input
            ref={nameInputRef}
            value={stage.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
            className="min-h-11 w-full bg-transparent font-body text-base font-medium text-gray-100 outline-none"
            aria-label="Stage name"
          />
        ) : (
          <button
            type="button"
            onClick={startEditingName}
            className="-m-2 flex min-h-11 min-w-0 items-center gap-2 truncate p-2 font-body text-sm font-medium text-gray-100"
          >
            <span className="truncate">{stage.name}</span>
            <span aria-hidden className="shrink-0 text-[13px] text-gray-500">
              ✎
            </span>
          </button>
        )}
        <div className="flex shrink-0 items-center gap-1">
          <span
            aria-hidden
            className="mr-1 h-[7px] w-[7px] shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
          />
          <button
            type="button"
            onClick={onDuplicate}
            className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center p-2 font-body text-sm text-gray-500 hover:text-led"
            aria-label="Duplicate stage"
            title="Duplicate stage"
          >
            ⧉
          </button>
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center p-2 font-body text-base text-gray-500 hover:text-red-400"
              aria-label="Remove stage"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <div className="mb-3 rounded-xl bg-screen px-4 py-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.12em] text-gray-500">
              Time
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={stage.time}
              onChange={(e) => onUpdate({ time: Math.max(0, Number(e.target.value)) })}
              className="w-full bg-transparent font-display text-2xl font-medium text-led [text-shadow:0_0_10px_theme(colors.led.dim)] outline-none"
            />
          </div>
          <div className="flex-1 text-right">
            <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.12em] text-gray-500">
              Hit Factor
            </span>
            <div className="font-display text-[28px] font-bold leading-none tabular-nums text-led [text-shadow:0_0_10px_theme(colors.led.dim)]">
              {hitFactor.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 flex gap-1.5">
        <button
          type="button"
          onClick={() => onUpdate({ powerFactor: 'minor' })}
          className={`min-h-11 flex-1 rounded-lg border py-2.5 font-body text-xs font-medium ${
            stage.powerFactor === 'minor'
              ? 'border-led-dim bg-[#2C2410] text-led'
              : 'border-chassis-2 bg-chassis-2 text-gray-500'
          }`}
        >
          Minor
        </button>
        <button
          type="button"
          onClick={() => onUpdate({ powerFactor: 'major' })}
          className={`min-h-11 flex-1 rounded-lg border py-2.5 font-body text-xs font-medium ${
            stage.powerFactor === 'major'
              ? 'border-led-dim bg-[#2C2410] text-led'
              : 'border-chassis-2 bg-chassis-2 text-gray-500'
          }`}
        >
          Major
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {COUNTER_ROWS.map(({ field, label }) => (
          <Counter
            key={field}
            label={label}
            value={stage[field]}
            onChange={(value) => onUpdate({ [field]: value })}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-chassis-2 pt-3 font-body text-xs text-gray-500">
        <span>Points</span>
        <span className="font-mono2 text-[13px] text-led">{totalPoints}</span>
      </div>
    </div>
  )
}
