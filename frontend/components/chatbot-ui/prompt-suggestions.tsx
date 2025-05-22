interface PromptSuggestionsProps {
  label: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="w-full max-w-full space-y-6 px-4">
      <h2 className="text-center text-2xl font-bold">{label}</h2>
      <div className="flex flex-wrap gap-4 w-full">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="w-full sm:w-auto flex-1 rounded-xl border bg-background p-4 hover:bg-muted"
          >
            <p className="text-sm">{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

