import { useStages } from './hooks/useStages'
import StageCard from './components/StageCard'

export default function App() {
  const { stages, addStage, duplicateStage, removeStage, updateStage } = useStages()

  return (
    <div className="min-h-screen bg-[#0D0E10] pb-16">
      <header className="border-b border-chassis-2 bg-chassis py-8 text-center shadow">
        <h1 className="font-display text-3xl font-bold tracking-wide text-led [text-shadow:0_0_14px_theme(colors.led.dim)]">
          HIT FACTOR
        </h1>
        <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-gray-500">
          Stage Calculator
        </p>
        <a
          href="tutorial.html"
          className="mt-3 inline-block font-body text-xs text-gray-500 underline decoration-chassis-3 underline-offset-4 hover:text-led hover:decoration-led-dim"
        >
          How it works
        </a>
      </header>

      <main className="mx-auto mt-8 flex max-w-md flex-col gap-6 px-4">
        {stages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            onUpdate={(updates) => updateStage(stage.id, updates)}
            onRemove={() => removeStage(stage.id)}
            onDuplicate={() => duplicateStage(stage.id)}
            canRemove={stages.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={addStage}
          className="rounded-xl border border-dashed border-chassis-3 py-3 font-body text-sm text-gray-400 hover:border-led-dim hover:text-led"
        >
          + Add Stage
        </button>
      </main>
    </div>
  )
}
