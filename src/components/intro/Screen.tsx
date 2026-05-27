import { Heading } from "@/components/Heading"
import { PageHeader } from "@/components/PageHeader"
import { Wrapper } from "@/components/Wrapper"
import { ARCHETYPES } from "@/archetypes"
import { Archetype } from "./Archetype";

import "./intro-screen.css"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <Wrapper className="intro-screen-background h-full bg-brand-burgundy">
      <PageHeader>
        <p className="text-lg text-brand-warm-grey/50 font-light uppercase tracking-widest">The New Standard of Facility Services</p>
      </PageHeader>

      <div className="flex flex-col gap-1 w-3/5">
        <Heading>Pop Quiz</Heading>
        <h1 className="text-8xl text-brand-warm-grey font-bold">What&rsquo;s your Partnership Personality?</h1>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl text-brand-warm-grey/70 font-sans-light font-light">
          At UG2, we meet our customers where they are. There are different dynamics at play in every relationship. Learning how people prefer to operate and communicate helps ground the relationship in trust.
        </p>
        <p className="text-2xl text-brand-warm-grey font-medium">
          Take the quiz to discover your Partner Archetype.
        </p>
      </div>

      <div className="flex justify-between gap-x-4">
        {Object.entries(ARCHETYPES).map(([key, value], index: number) => (
          <Archetype key={key} index={`0${index + 1}`} name={value.name} factor={value.factor} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg text-brand-warm-grey/50 font-medium uppercase tracking-widest">5 Questions &middot; about 2 minutes</p>
        <button
          onClick={onStart}
          className="bg-brand-warm-grey text-brand-burgundy px-6 py-4 text-xl font-bold uppercase tracking-wide flex items-center gap-x-2">
            Begin
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
      </div>
      </Wrapper>
  )
}
