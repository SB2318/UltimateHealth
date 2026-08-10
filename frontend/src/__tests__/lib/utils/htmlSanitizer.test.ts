import {sanitizeHtml} from '../../../lib/utils/htmlSanitizer';

describe('sanitizeHtml', () => {
  it('handles null, undefined and empty input', () => {
    expect(sanitizeHtml(null)).toBe('');
    expect(sanitizeHtml(undefined)).toBe('');
    expect(sanitizeHtml('')).toBe('');
  });

  it('removes script, iframe, object and embed tags', () => {
    expect(sanitizeHtml('<script>alert(1)</script>')).toBe('');
    expect(
      sanitizeHtml('<p>a</p><iframe src="https://evil.example"></iframe>'),
    ).toBe('<p>a</p>');
    expect(
      sanitizeHtml('<object data="x"></object><embed src="y"><p>ok</p>'),
    ).toBe('<p>ok</p>');
  });

  it('removes tags whose name is entity-encoded', () => {
    expect(sanitizeHtml('<scr&#105;pt>alert(1)</scr&#105;pt>')).toBe('');
  });

  it('strips plain event-handler attributes', () => {
    expect(sanitizeHtml('<img src=x onerror=alert(1)>')).toBe('<img src=x>');
    expect(
      sanitizeHtml('<img src=x onerror="alert(1)" onload=alert(2)>'),
    ).toBe('<img src=x>');
  });

  it('neutralises entity-encoded event-handler attribute names', () => {
    const out = sanitizeHtml('<img src=x onerr&#111;r=alert(1)>');
    expect(out).toBe('<img src=x>');
    expect(out).not.toContain('onerror');
  });

  it('blocks javascript: URLs in href/src', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">click</a>')).toBe(
      '<a>click</a>',
    );
    expect(sanitizeHtml('<img src="javascript:alert(1)">')).toBe('<img>');
  });

  it('blocks entity-encoded javascript: scheme in href', () => {
    const out = sanitizeHtml('<a href="java&#115;cript:alert(1)">click</a>');
    expect(out).toBe('<a>click</a>');
    expect(out).not.toContain('javascript');
  });

  it('blocks vbscript: and non-image data: schemes', () => {
    expect(
      sanitizeHtml('<a href="vbscript:msgbox(1)">x</a>'),
    ).toBe('<a>x</a>');
    expect(
      sanitizeHtml('<img src="data:text/html,<script>alert(1)</script>">'),
    ).toBe('<img>');
  });

  it('drops xlink:href on SVG links', () => {
    const out = sanitizeHtml('<a xlink:href="javascript:alert(1)">x</a>');
    expect(out).toBe('<a>x</a>');
    expect(out).not.toContain('xlink');
  });

  it('blocks SVG and MathML containers entirely', () => {
    expect(sanitizeHtml('<svg onload=alert(1)></svg>')).toBe('');
    expect(sanitizeHtml('<math><mi>x</mi></math>')).toBe('');
  });

  it('drops style, srcdoc and formaction attributes', () => {
    expect(
      sanitizeHtml('<p style="background:url(javascript:alert(1))">x</p>'),
    ).toBe('<p>x</p>');
    expect(
      sanitizeHtml('<iframe srcdoc="<script>alert(1)</script>"></iframe>'),
    ).toBe('');
    expect(
      sanitizeHtml('<button formaction="javascript:alert(1)">x</button>'),
    ).toBe('');
  });

  it('removes HTML comments and doctypes', () => {
    expect(sanitizeHtml('<!-- comment --><p>ok</p>')).toBe('<p>ok</p>');
    expect(sanitizeHtml('<!DOCTYPE html><p>ok</p>')).toBe('<p>ok</p>');
  });

  it('preserves safe article formatting', () => {
    const safe = '<p>Hello <a href="https://example.com">link</a></p>';
    expect(sanitizeHtml(safe)).toBe(safe);
    expect(
      sanitizeHtml('<img src="/img.png" alt="x"><ul><li>a</li></ul>'),
    ).toBe('<img src="/img.png" alt="x"><ul><li>a</li></ul>');
  });
});
