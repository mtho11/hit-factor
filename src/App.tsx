import { useStages } from './hooks/useStages'
import StageCard from './components/StageCard'

export default function App() {
  const { stages, addStage, removeStage, updateStage } = useStages()

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-blue-800 py-8 text-center text-4xl text-white shadow">
        Hit Factor Calculator
      </header>

      <main className="mx-auto mt-8 flex max-w-md flex-col gap-8 px-4">
        {stages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            onUpdate={(updates) => updateStage(stage.id, updates)}
            onRemove={() => removeStage(stage.id)}
            canRemove={stages.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={addStage}
          className="rounded-lg border-2 border-dashed border-indigo-400 py-3 text-indigo-600 hover:bg-indigo-50"
        >
          + Add Stage
        </button>
      </main>
    </div>
  )
}
