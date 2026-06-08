interface ArchetypeProps {
  index: string
  name: string
  factor: string
  color: string
}

export function Archetype({ index, name, factor, color }: ArchetypeProps) {
  return (
    <div className={`flex flex-col justify-between flex-1 gap-4 border-t-white/40 border-t-4 p-4 ${color}`}>
      <div>
        <h3 className="text-lg text-white font-medium uppercase tracking-widest">{factor}</h3>
      </div>
      <span className="text-white text-3xl font-bold tracking-tight">{name}</span>
    </div>
  )
}
