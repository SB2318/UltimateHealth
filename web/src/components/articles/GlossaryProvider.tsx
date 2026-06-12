"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { defaultGlossaryTerms } from "@/lib/article-data";

export interface GlossaryContextValue {
  /** Map of term → definition for the current article context */
  terms: Map<string, string>;
  getDefinition: (term: string) => string | undefined;
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null);

interface GlossaryProviderProps {
  children: ReactNode;
  /** Optional override for the glossary terms. Defaults to the platform-wide health glossary. */
  terms?: Record<string, string>;
}

/**
 * GlossaryProvider supplies glossary term definitions to the article content tree.
 * Wrap the article page with this provider to enable interactive tooltip definitions
 * for medical and health terminology.
 *
 * FUTURE: This provider is also the integration point for:
 * - AI-powered term explanations (stream definitions on hover)
 * - User-created personal glossary entries
 * - Term frequency analytics for content quality scoring
 */
export function GlossaryProvider({
  children,
  terms = defaultGlossaryTerms,
}: GlossaryProviderProps) {
  const glossaryMap = useMemo(
    () => new Map(Object.entries(terms)),
    [terms]
  );

  const value = useMemo<GlossaryContextValue>(
    () => ({
      terms: glossaryMap,
      getDefinition: (term: string) => glossaryMap.get(term),
    }),
    [glossaryMap]
  );

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  );
}

/**
 * Access the glossary context from within article content components.
 * Returns an empty glossary when called outside a GlossaryProvider (safe fallback).
 */
export function useGlossary(): GlossaryContextValue {
  const ctx = useContext(GlossaryContext);
  if (!ctx) {
    return {
      terms: new Map(),
      getDefinition: () => undefined,
    };
  }
  return ctx;
}
