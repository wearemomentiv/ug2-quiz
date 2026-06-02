import bridgeBuilderIcon from "@/assets/images/bridge-builder-archetype.png";
import excellenceAcceleratorIcon from "@/assets/images/excellence-accelerator-archetype.png";
import visionaryIcon from "@/assets/images/the-visionary-archetype.png";
import conflictSolverIcon from "@/assets/images/conflict-solver-archetype.png";

export const ARCHETYPES = {
  trust: {
    name: "Bridge Builder",
    factor: "Trust",
    color: "bg-brand-burgundy",
    icon: bridgeBuilderIcon,
    blurb:
      "You are the mortar between the bricks, strengthening bonds between others to create unbreakable bonds for resilient relationships.",
  },
  expertise: {
    name: "Excellence Accelerator",
    factor: "Expertise",
    color: "bg-brand-light-red",
    icon: excellenceAcceleratorIcon,
    blurb:
      "You leverage your broad experience to see the whole person and find ways to inspire others' best work.",
  },
  innovation: {
    name: "Visionary",
    factor: "Innovation",
    color: "bg-brand-dark-red",
    icon: visionaryIcon,
    blurb:
      "Whether coming up with a fresh approach of your own or tapping others for new solutions, you are always thinking outside the box.",
  },
  commitment: {
    name: "Conflict Solver",
    factor: "Commitment",
    color: "bg-brand-blue-dark",
    icon: conflictSolverIcon,
    blurb:
      "You aren't afraid to investigate differences, and you are skilled at finding common ground to build consensus.",
  },
} as const;

export type ArchetypeKey = keyof typeof ARCHETYPES;

export type ArchetypeResult = {
  key: ArchetypeKey;
  isMixed: boolean;
};

// Map answer index (0..3 = A..D) to archetype key per the answer key:
//   A → Bridge Builder (trust)
//   B → Conflict Solver (commitment)
//   C → Excellence Accelerator (expertise)
//   D → Visionary (innovation)
//   E (index 4) is the joke/"none" answer and only used for the special rules below.
const LETTER_TO_KEY: ArchetypeKey[] = [
  "trust",
  "commitment",
  "expertise",
  "innovation",
];

/**
 * Determine the partnership archetype from a list of answer indexes (0..4),
 * applying the answer key rules:
 *   - ALL Es → Visionary (mixed)
 *   - Mostly Es → mixed message; archetype comes from the next most frequent
 *     A–D letter (with tie rules applied)
 *   - Single A–D plurality → that archetype
 *   - 2-way A–D tie → Bridge Builder (mixed)
 *   - 3- or 4-way A–D tie → Excellence Accelerator (mixed)
 */
export function determineArchetype(answers: number[]): ArchetypeResult {
  const counts = [0, 0, 0, 0, 0];
  for (const a of answers) {
    if (a >= 0 && a < counts.length) counts[a]++;
  }

  if (answers.length > 0 && counts[4] === answers.length) {
    return { key: "innovation", isMixed: true };
  }

  const adCounts = counts.slice(0, 4);
  const maxAD = Math.max(...adCounts);
  const isMostlyEs = counts[4] > maxAD;

  const winners = adCounts
    .map((c, i) => (c === maxAD ? i : -1))
    .filter((i) => i !== -1);

  if (winners.length === 1) {
    return { key: LETTER_TO_KEY[winners[0]], isMixed: isMostlyEs };
  }

  if (winners.length === 2) {
    return { key: "trust", isMixed: true };
  }

  return { key: "expertise", isMixed: true };
}
