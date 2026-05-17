import logo from "@/assets/images/ug2-logo.png"

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between">
      <img src={logo} alt="UG2 Logo" className="h-14 w-auto" />
      {children}
    </header>
  )
}
