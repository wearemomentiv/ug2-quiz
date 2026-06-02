import { describe, it, expect } from "vitest";
import { ARCHETYPES, determineArchetype } from "@/archetypes";

// Answer index legend (matches the LETTER_TO_KEY map in archetypes.ts):
//   0 = A -> trust (Bridge Builder)
//   1 = B -> commitment (Conflict Solver)
//   2 = C -> expertise (Excellence Accelerator)
//   3 = D -> innovation (Visionary)
//   4 = E -> the joke/"none" answer

describe("determineArchetype - clear pluralities", () => {
  it("returns trust when A is the plurality", () => {
    expect(determineArchetype([0, 0, 0, 1, 2])).toEqual({
      key: "trust",
      isMixed: false,
    });
  });

  it("returns commitment when B is the plurality", () => {
    expect(determineArchetype([1, 1, 1, 0, 2])).toEqual({
      key: "commitment",
      isMixed: false,
    });
  });

  it("returns expertise when C is the plurality", () => {
    expect(determineArchetype([2, 2, 2, 0, 1])).toEqual({
      key: "expertise",
      isMixed: false,
    });
  });

  it("returns innovation when D is the plurality", () => {
    expect(determineArchetype([3, 3, 3, 0, 1])).toEqual({
      key: "innovation",
      isMixed: false,
    });
  });

  it("handles a unanimous A->D answer set", () => {
    expect(determineArchetype([3, 3, 3, 3, 3])).toEqual({
      key: "innovation",
      isMixed: false,
    });
  });
});

describe("determineArchetype - E (joke answer) rules", () => {
  it("returns innovation (mixed) when every answer is E", () => {
    expect(determineArchetype([4, 4, 4, 4, 4])).toEqual({
      key: "innovation",
      isMixed: true,
    });
  });

  it("flags isMixed when E is the most common answer but an A-D plurality still wins", () => {
    // counts: A=2, E=3 -> mostly Es, but trust is the lone A-D winner
    expect(determineArchetype([0, 0, 4, 4, 4])).toEqual({
      key: "trust",
      isMixed: true,
    });
  });

  it("does not flag isMixed when E count does not exceed the A-D plurality", () => {
    // counts: A=3, E=2 -> trust wins outright
    expect(determineArchetype([0, 0, 0, 4, 4])).toEqual({
      key: "trust",
      isMixed: false,
    });
  });
});

describe("determineArchetype - tie-breaking", () => {
  it("resolves a 2-way A-D tie to trust (mixed)", () => {
    // counts: A=2, C=2 -> two winners
    expect(determineArchetype([0, 0, 2, 2, 1])).toEqual({
      key: "trust",
      isMixed: true,
    });
  });

  it("resolves a 3-way A-D tie to expertise (mixed)", () => {
    // counts: A=1, C=1, D=1 (E=2) -> three A-D winners
    expect(determineArchetype([0, 2, 3, 4, 4])).toEqual({
      key: "expertise",
      isMixed: true,
    });
  });

  it("resolves a 4-way A-D tie to expertise (mixed)", () => {
    // counts: A=1, B=1, C=1, D=1 -> four winners
    expect(determineArchetype([0, 1, 2, 3, 4])).toEqual({
      key: "expertise",
      isMixed: true,
    });
  });
});

describe("determineArchetype - guards", () => {
  it("ignores out-of-range answer indexes", () => {
    expect(determineArchetype([0, 0, 0, -1, 99])).toEqual({
      key: "trust",
      isMixed: false,
    });
  });

  it("treats an empty answer set as a 4-way tie (expertise, mixed)", () => {
    expect(determineArchetype([])).toEqual({
      key: "expertise",
      isMixed: true,
    });
  });

  it("only ever returns keys that exist in ARCHETYPES", () => {
    const result = determineArchetype([0, 1, 2, 3, 4]);
    expect(Object.keys(ARCHETYPES)).toContain(result.key);
  });
});
