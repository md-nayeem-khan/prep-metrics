// MOCK INTERVIEW DOMAIN TYPES — multi-type (coding | systemDesign | behavioral).
// This is the single source of truth that drives the mock UI (create dialog, submit
// rubric, list badges) and the route branching. Adding a 4th interview type should be
// a single new entry in MOCK_TYPE_CONFIG plus its rubric dimensions.

import type { ElementType } from "react";
import { Code2, Network, MessageSquare } from "lucide-react";
import { SD_RUBRIC_DIMENSIONS } from "@/types/system-design";
import { STAR_RUBRIC_DIMENSIONS } from "@/types/behavioral";

export type MockType = "coding" | "systemDesign" | "behavioral";
export type MockStatus = "inProgress" | "completed";
export const MOCK_TYPES: MockType[] = ["coding", "systemDesign", "behavioral"];

export type MockQuestionSource = "bank" | "random" | "manual";

// A rubric dimension as consumed by the UI scorer. The existing SD_RUBRIC_DIMENSIONS
// and STAR_RUBRIC_DIMENSIONS arrays are assignable to this shape.
export interface RubricDimension {
  key: string;
  label: string;
  description: string;
}

// Coding rubric defined here for symmetry with the SD/STAR dimension arrays.
export type CodingRubricKey = "explanationScore" | "codeQualityScore";
export const CODING_RUBRIC_DIMENSIONS: RubricDimension[] = [
  { key: "explanationScore", label: "Explanation", description: "Clarity of approach, complexity analysis, and walk-through" },
  { key: "codeQualityScore", label: "Code Quality", description: "Correctness, readability, and edge-case handling" },
];

export interface MockTypeConfig {
  type: MockType;
  label: string;        // "System Design"
  shortLabel: string;   // compact label for badges
  icon: ElementType;    // lucide icon
  defaultTimeLimitMinutes: number;
  defaultDifficulty: string | null;
  difficultyOptions: string[]; // empty → no difficulty selector
  rubricDimensions: RubricDimension[]; // drives the Submit dialog
  rubricKeys: string[];
  questionSources: MockQuestionSource[];
  bankEndpoint: string;          // GET endpoint that returns { problems | questions: [...] }
  bankCollectionKey: "problems" | "questions"; // key under which the bank list is returned
  bankLabelField: "title" | "prompt"; // which field renders in the bank dropdown
}

export const MOCK_TYPE_CONFIG: Record<MockType, MockTypeConfig> = {
  coding: {
    type: "coding",
    label: "Coding",
    shortLabel: "Coding",
    icon: Code2,
    defaultTimeLimitMinutes: 45,
    defaultDifficulty: "medium",
    difficultyOptions: ["easy", "medium", "hard"],
    rubricDimensions: CODING_RUBRIC_DIMENSIONS,
    rubricKeys: CODING_RUBRIC_DIMENSIONS.map((d) => d.key),
    questionSources: ["bank", "random", "manual"],
    bankEndpoint: "/api/problems",
    bankCollectionKey: "problems",
    bankLabelField: "title",
  },
  systemDesign: {
    type: "systemDesign",
    label: "System Design",
    shortLabel: "System Design",
    icon: Network,
    defaultTimeLimitMinutes: 45,
    defaultDifficulty: "medium",
    difficultyOptions: ["medium", "hard"],
    rubricDimensions: SD_RUBRIC_DIMENSIONS,
    rubricKeys: SD_RUBRIC_DIMENSIONS.map((d) => d.key),
    questionSources: ["bank", "random", "manual"],
    bankEndpoint: "/api/system-design",
    bankCollectionKey: "questions",
    bankLabelField: "title",
  },
  behavioral: {
    type: "behavioral",
    label: "Behavioral",
    shortLabel: "Behavioral",
    icon: MessageSquare,
    defaultTimeLimitMinutes: 5,
    defaultDifficulty: null,
    difficultyOptions: [],
    rubricDimensions: STAR_RUBRIC_DIMENSIONS,
    rubricKeys: STAR_RUBRIC_DIMENSIONS.map((d) => d.key),
    questionSources: ["bank", "random", "manual"],
    bankEndpoint: "/api/behavioral",
    bankCollectionKey: "questions",
    bankLabelField: "prompt",
  },
};

export const isMockType = (v: unknown): v is MockType => MOCK_TYPES.includes(v as MockType);

export const getMockTypeConfig = (type: string): MockTypeConfig =>
  MOCK_TYPE_CONFIG[isMockType(type) ? type : "coding"];
