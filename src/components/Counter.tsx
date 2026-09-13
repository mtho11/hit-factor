interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export default function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-2">
      <span className="text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-14 rounded-full bg-gray-200 py-2 text-lg font-medium text-gray-800 hover:bg-gray-300 active:bg-gray-400"
        aria-label={`Decrease ${label}`}
      >
        &minus;
      </button>
      <span className="w-6 text-center text-lg tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-14 rounded-full bg-gray-200 py-2 text-lg font-medium text-gray-800 hover:bg-gray-300 active:bg-gray-400"
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  )
}
