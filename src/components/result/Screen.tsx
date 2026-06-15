import { PageHeader } from "@/components/PageHeader";
import { Wrapper } from "@/components/Wrapper";
import { ARCHETYPES } from "@/archetypes";
import type { ArchetypeResult } from "@/archetypes";

interface ResultScreenProps {
  result: ArchetypeResult;
  onRestart: () => void;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const archetype = ARCHETYPES[result.key];

  const leadIn = result.isMixed
    ? "You\u2019re a mix of styles, but you lean most toward"
    : "Based on your responses, you align most with";

  const closingMix = result.isMixed ? "mix" : "combination";
  const closingPunctuation = result.isMixed ? "." : "!";

  return (
    <Wrapper className={`${archetype.color} h-full justify-between`}>
      <PageHeader>
        <p className="text-lg text-white/50 font-medium uppercase tracking-widest">
          Your Result
        </p>
      </PageHeader>

      <div className="flex items-center justify-between gap-12">
        <div className="flex flex-col gap-8 w-3/5">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-white/70 font-medium uppercase tracking-widest">
              {leadIn}
            </h2>
            <h1 className="text-8xl text-white font-bold">
              {archetype.name}
            </h1>
            <p className="text-3xl text-white font-sans-light font-light mt-2">
              {archetype.blurb}
            </p>
          </div>

          <p className="text-2xl text-white font-medium">
            Whatever {closingMix} of skills and insights you bring to a
            partnership, we appreciate you. Let&rsquo;s meet wherever you are and
            work up something great together{closingPunctuation}
          </p>
        </div>

        <img
          src={archetype.icon}
          alt={`${archetype.name} badge`}
          className="h-72 w-72 flex-none object-contain"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg text-white/50 font-medium uppercase tracking-widest">
          The New Standard of Facility Services
        </p>
        <button
          onClick={onRestart}
          className="bg-brand-warm-grey text-brand-burgundy px-6 py-4 text-xl font-bold uppercase tracking-wide flex items-center gap-x-2"
        >
          Retake Quiz
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </Wrapper>
  );
}
