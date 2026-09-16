interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export default function Counter({ label, value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-chassis-2 py-1.5 pl-3 pr-1.5">
      <span className="shrink-0 font-body text-[11.5px] text-gray-400">{label}</span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-9 w-9 shrink-0 rounded-[7px] bg-chassis-3 text-sm leading-none text-gray-200 shadow-[0_1.5px_0_#0F1013,inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-chassis-3/80 active:translate-y-px active:shadow-none"
          aria-label={`Decrease ${label}`}
        >
          &minus;
        </button>
        <span className="w-5 text-center font-mono2 text-[13px] text-gray-200">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-9 w-9 shrink-0 rounded-[7px] bg-chassis-3 text-sm leading-none text-gray-200 shadow-[0_1.5px_0_#0F1013,inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-chassis-3/80 active:translate-y-px active:shadow-none"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
