interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export default function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-chassis-2 px-3 py-2">
      <span className="font-body text-[11.5px] text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-5 w-5 rounded-[5px] bg-chassis-3 text-xs leading-none text-gray-200 shadow-[0_1.5px_0_#0F1013,inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-chassis-3/80 active:translate-y-px active:shadow-none"
          aria-label={`Decrease ${label}`}
        >
          &minus;
        </button>
        <span className="w-4 text-center font-mono2 text-[12.5px] text-gray-200">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-5 w-5 rounded-[5px] bg-chassis-3 text-xs leading-none text-gray-200 shadow-[0_1.5px_0_#0F1013,inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-chassis-3/80 active:translate-y-px active:shadow-none"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
