// HTML sanitizer for content rendered inside WebViews.
//
// The previous regex-only sanitizer could be bypassed with HTML entity
// encoding (e.g. `onerr&#111;r=alert(1)` decoding to `onerror=alert(1)`,
// `href="java&#115;cript:..."` decoding to `javascript:`) and with SVG
// attributes such as `xlink:href` that the `href|src` filter never checked.
// This implementation:
//   - parses tags token-by-token (respecting quoted attribute values),
//   - decodes HTML entities in every tag name and attribute name/value
//     *before* applying dangerous-tag and dangerous-attribute checks, and
//   - removes the inner content of blocked tags (script, iframe, style, svg,
//     math, ...) so their payloads cannot leak or execute.

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
  colon: ':',
  sol: '/',
  excl: '!',
  period: '.',
  comma: ',',
};

const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(#x?[0-9a-f]+|(?:[a-z][a-z0-9]*));/gi, (entity, code) => {
    if (code[0] === '#') {
      const isHex = code[1]?.toLowerCase() === 'x';
      const num = parseInt(isHex ? code.slice(2) : code.slice(1), isHex ? 16 : 10);
      if (Number.isNaN(num) || num < 0 || num > 0x10ffff) {
        return entity;
      }
      return String.fromCodePoint(num);
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? entity;
  });

// Tags that can carry or execute scripts. The opening tag and all of its
// inner content are removed.
const DANGEROUS_TAGS = new Set([
  'script',
  'iframe',
  'object',
  'embed',
  'applet',
  'form',
  'input',
  'button',
  'select',
  'option',
  'textarea',
  'meta',
  'link',
  'base',
  'style',
  'template',
  'svg',
  'math',
  'frame',
  'frameset',
  'noframes',
  'noscript',
  'title',
]);

// Void tags never carry a matching closing tag, so they must not push onto
// the "inside dangerous content" stack (e.g. `<embed>` is a void element).
const VOID_TAGS = new Set([
  'embed',
  'meta',
  'link',
  'base',
  'input',
  'img',
  'br',
  'hr',
  'source',
  'wbr',
]);

// Attributes that can trigger script execution or navigation. Blocked
// wholesale, including after entity decoding of the attribute name.
const DANGEROUS_ATTRS = new Set([
  'style',
  'srcdoc',
  'formaction',
  'action',
  'xlink:href',
  'xmlns',
  'xml:base',
  'srcset',
  'background',
  'dynsrc',
  'lowsrc',
  'poster',
  'ping',
  'data',
  'form',
]);

const SAFE_URL_ATTRS = new Set(['href', 'src']);

const SAFE_URL_SCHEMES = new Set(['http', 'https', 'mailto', 'tel', 'sms']);

const isSafeUrl = (value: string): boolean => {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  const scheme = trimmed.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
  if (!scheme) {
    return true;
  }
  return SAFE_URL_SCHEMES.has(scheme);
};

// Returns the index of the `>` that closes the tag starting at `start`,
// skipping any `>` that appears inside a quoted attribute value. Returns -1
// if the tag is never closed.
const findTagEnd = (html: string, start: number): number => {
  let quote: string | null = null;
  for (let i = start + 1; i < html.length; i++) {
    const char = html[i];
    if (quote) {
      if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '>') {
      return i;
    }
  }
  return -1;
};

type ParsedTag = {
  name: string;
  isClosing: boolean;
  isVoid: boolean;
  isComment: boolean;
};

const parseTag = (tag: string): ParsedTag => {
  if (tag.startsWith('<!--') || tag.startsWith('<!') || tag.startsWith('<?')) {
    return {name: '', isClosing: false, isVoid: false, isComment: true};
  }

  const tagMatch = tag.match(/^<\s*(\/?)([^\s>/]+)/i);
  if (!tagMatch) {
    return {name: '', isClosing: false, isVoid: false, isComment: false};
  }

  const isClosing = tagMatch[1] === '/';
  const name = decodeHtmlEntities(tagMatch[2]).toLowerCase();

  return {
    name,
    isClosing,
    isVoid: VOID_TAGS.has(name),
    isComment: false,
  };
};

const sanitizeTag = (tag: string): string => {
  const tagMatch = tag.match(/^<\s*(\/?)([^\s>/]+)/i);
  if (!tagMatch) {
    return tag;
  }

  const isClosing = tagMatch[1] === '/';
  const tagName = decodeHtmlEntities(tagMatch[2]).toLowerCase();

  if (isClosing) {
    return `</${tagName}>`;
  }

  const attributePattern = /\s+([^\s=/>]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]*))?/g;
  const attributes: string[] = [];
  const rest = tag.slice(tagMatch[0].length);
  let match: RegExpExecArray | null;
  while ((match = attributePattern.exec(rest)) !== null) {
    const rawName = match[1];
    const rawValue = match[2] ?? '';
    const attrName = decodeHtmlEntities(rawName).toLowerCase();

    if (attrName.startsWith('on')) {
      continue;
    }
    if (DANGEROUS_ATTRS.has(attrName)) {
      continue;
    }

    if (SAFE_URL_ATTRS.has(attrName)) {
      const decodedValue = decodeHtmlEntities(rawValue.replace(/^["']|["']$/g, ''));
      if (!isSafeUrl(decodedValue)) {
        continue;
      }
    }

    attributes.push(rawValue ? ` ${rawName}=${rawValue}` : ` ${rawName}`);
  }

  return `<${tagName}${attributes.join('')}>`;
};

export const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) {
    return '';
  }

  let result = '';
  let cursor = 0;
  const dangerousStack: string[] = [];

  while (cursor < html.length) {
    const tagStart = html.indexOf('<', cursor);
    if (tagStart === -1) {
      if (dangerousStack.length === 0) {
        result += html.slice(cursor);
      }
      break;
    }

    if (dangerousStack.length === 0) {
      result += html.slice(cursor, tagStart);
    }

    const tagEnd = findTagEnd(html, tagStart);
    if (tagEnd === -1) {
      if (dangerousStack.length === 0) {
        result += html.slice(cursor);
      }
      break;
    }

    const rawTag = html.slice(tagStart, tagEnd + 1);
    cursor = tagEnd + 1;

    const parsed = parseTag(rawTag);

    if (parsed.isComment) {
      continue;
    }

    if (DANGEROUS_TAGS.has(parsed.name)) {
      if (parsed.isClosing) {
        const index = dangerousStack.lastIndexOf(parsed.name);
        if (index !== -1) {
          dangerousStack.splice(index, 1);
        }
      } else if (!parsed.isVoid) {
        dangerousStack.push(parsed.name);
      }
      continue;
    }

    if (dangerousStack.length === 0) {
      result += sanitizeTag(rawTag);
    }
  }

  return result;
};
