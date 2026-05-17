export function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-12 pb-16 pt-14 px-20 ${className}`}>
      {children}
    </div>
  )
}
