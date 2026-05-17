import { Heading } from "../Heading"

interface ArchetypeProps {
  index: string
  name: string
  factor: string
}

export function Archetype({ index, name, factor }: ArchetypeProps) {
  return (
    <div className="flex flex-col justify-between flex-1 gap-4 bg-brand-warm-grey/5 border border-brand-warm-grey/20 border-t-brand-warm-grey border-t-4 p-4">
      <div>
        <span className="text-brand-warm-grey font-mono font-sm font-light">{index}</span>
        <Heading>{factor}</Heading>
      </div>
      <span className="text-white text-3xl font-bold tracking-tight">{name}</span>
    </div>
  )
}
