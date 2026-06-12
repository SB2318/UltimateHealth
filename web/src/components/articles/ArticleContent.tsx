"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type {
  ContentBlock,
  CalloutVariant,
  HeadingLevel,
  RichContent,
} from "@/types/article";
import { GlossaryTooltip } from "@/components/ui/glossary-tooltip";
import { useGlossary } from "./GlossaryProvider";

// ─── Glossary term highlighting ───────────────────────────────────────────────

/**
 * Returns true if the string contains HTML tags.
 * Paragraphs with HTML tags use dangerouslySetInnerHTML; plain text gets
 * glossary term highlighting injected as React nodes.
 */
function hasHtmlTags(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
}

/**
 * Splits plain text around known glossary terms and wraps each match in a
 * GlossaryTooltip. Matching is case-insensitive.
 *
 * FUTURE: Extend to support fuzzy matching, plural forms, and term stemming.
 */
function applyGlossaryHighlighting(
  text: string,
  glossary: Map<string, string>
): ReactNode {
  if (glossary.size === 0 || !text) return text;

  const keys = [...glossary.keys()];
  const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const matchedKey = keys.find(
      (k) => k.toLowerCase() === part.toLowerCase()
    );
    if (matchedKey) {
      return (
        <GlossaryTooltip
          key={i}
          term={matchedKey}
          definition={glossary.get(matchedKey)!}
        >
          {part}
        </GlossaryTooltip>
      );
    }
    return part;
  });
}

// ─── Callout configuration ────────────────────────────────────────────────────

interface CalloutConfig {
  icon: string;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  titleClass: string;
  textClass: string;
}

const CALLOUT_CONFIG: Record<CalloutVariant, CalloutConfig> = {
  tip: {
    icon: "💡",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
    iconBgClass: "bg-emerald-100",
    titleClass: "text-emerald-800",
    textClass: "text-emerald-700",
  },
  note: {
    icon: "📝",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    iconBgClass: "bg-blue-100",
    titleClass: "text-blue-800",
    textClass: "text-blue-700",
  },
  warning: {
    icon: "⚠️",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-200",
    iconBgClass: "bg-amber-100",
    titleClass: "text-amber-800",
    textClass: "text-amber-700",
  },
  info: {
    icon: "ℹ️",
    bgClass: "bg-sky-50",
    borderClass: "border-sky-200",
    iconBgClass: "bg-sky-100",
    titleClass: "text-sky-800",
    textClass: "text-sky-700",
  },
};

// ─── Block renderers ──────────────────────────────────────────────────────────

const HEADING_CLASSES: Record<HeadingLevel, string> = {
  2: "text-2xl md:text-3xl font-bold text-[#1a202c] mt-12 mb-5 pb-2 border-b border-gray-100 scroll-mt-20",
  3: "text-xl md:text-2xl font-semibold text-[#2d3748] mt-9 mb-3 scroll-mt-20",
  4: "text-lg md:text-xl font-semibold text-[#4a5568] mt-7 mb-2 scroll-mt-20",
};

const HEADING_TAGS: Record<HeadingLevel, "h2" | "h3" | "h4"> = {
  2: "h2",
  3: "h3",
  4: "h4",
};

interface ArticleContentProps {
  content: RichContent;
}

/**
 * Renders a structured article's rich content blocks into accessible, typographically
 * optimised HTML. Integrates with GlossaryProvider to auto-highlight known health
 * terms in plain-text paragraphs with interactive tooltip definitions.
 *
 * Supported block types:
 *   heading | paragraph | image | blockquote | callout | list | divider
 *
 * FUTURE integration hooks (no refactor required):
 *   - Text-to-speech: wrap rendered output in a SpeechProvider
 *   - AI explanations: wrap callouts or headings with ExplainButton
 *   - Reading position tracking: add IntersectionObserver per heading block
 */
export default function ArticleContent({ content }: ArticleContentProps) {
  const { terms } = useGlossary();

  if (!content.blocks.length) {
    return (
      <p className="text-[#718096] italic text-center py-12">
        Article content is loading…
      </p>
    );
  }

  return (
    <section aria-label="Article body">
      {content.blocks.map((block, index) =>
        renderBlock(block, index, terms)
      )}
    </section>
  );
}

function renderBlock(
  block: ContentBlock,
  index: number,
  glossary: Map<string, string>
): ReactNode {
  switch (block.type) {
    case "heading": {
      const Tag = HEADING_TAGS[block.level];
      return (
        <Tag
          key={index}
          id={block.id}
          className={HEADING_CLASSES[block.level]}
        >
          {/* Anchor link for direct section linking */}
          <a
            href={`#${block.id}`}
            className="group relative no-underline text-inherit hover:text-[#667eea] transition-colors"
            aria-label={`Section: ${block.text}`}
          >
            {block.text}
            <span
              className="absolute -left-6 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity text-[#667eea] text-sm"
              aria-hidden="true"
            >
              #
            </span>
          </a>
        </Tag>
      );
    }

    case "paragraph": {
      const isHtml = hasHtmlTags(block.html);
      return (
        <p
          key={index}
          className="text-[#374151] leading-[1.875] mb-6"
        >
          {isHtml ? (
            /* HTML paragraphs (inline bold, italics, links) are safe — data is controlled */
            <span dangerouslySetInnerHTML={{ __html: block.html }} />
          ) : (
            /* Plain text paragraphs receive glossary term highlighting */
            applyGlossaryHighlighting(block.html, glossary)
          )}
        </p>
      );
    }

    case "image": {
      return (
        <figure key={index} className="my-10 -mx-4 sm:mx-0">
          <div className="relative aspect-video overflow-hidden sm:rounded-2xl bg-gray-100 shadow-md">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 740px, 740px"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-center text-[#718096] mt-3 px-4 leading-relaxed italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "blockquote": {
      return (
        <blockquote
          key={index}
          className="relative my-10 pl-6 pr-4 py-5 border-l-4 border-[#667eea] rounded-r-2xl bg-gradient-to-r from-[#667eea]/8 to-[#764ba2]/4"
        >
          <p className="text-lg italic text-[#4a5568] leading-relaxed mb-0">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer className="mt-3 text-sm text-[#718096] font-medium not-italic">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    }

    case "callout": {
      const cfg = CALLOUT_CONFIG[block.variant];
      return (
        <aside
          key={index}
          role="note"
          aria-label={`${block.variant}: ${block.title}`}
          className={[
            "my-8 rounded-2xl border p-5 flex gap-4",
            cfg.bgClass,
            cfg.borderClass,
          ].join(" ")}
        >
          {/* Icon */}
          <div
            className={[
              "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg mt-0.5",
              cfg.iconBgClass,
            ].join(" ")}
            aria-hidden="true"
          >
            {cfg.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-sm mb-1.5 ${cfg.titleClass}`}>
              {block.title}
            </h4>
            <p className={`text-sm leading-relaxed ${cfg.textClass}`}>
              {block.text}
            </p>
          </div>
        </aside>
      );
    }

    case "list": {
      const isOrdered = block.listType === "ordered";
      const Wrapper = isOrdered ? "ol" : "ul";

      return (
        <Wrapper key={index} className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-[#374151] leading-[1.75]">
              {isOrdered ? (
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-[#667eea] bg-[#667eea]/10 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ) : (
                <span
                  className="w-2 h-2 rounded-full bg-[#667eea] flex-shrink-0 mt-2.5"
                  aria-hidden="true"
                />
              )}
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </Wrapper>
      );
    }

    case "divider": {
      return (
        <hr
          key={index}
          className="my-14 border-none h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          aria-hidden="true"
        />
      );
    }

    default:
      return null;
  }
}
