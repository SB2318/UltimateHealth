export const DYSLEXIA_FONT_FAMILY = "'OpenDyslexic', 'Comic Sans MS', 'Arial', sans-serif";
export const DEFAULT_FONT_FAMILY = "'Times New Roman'";

export const generateArticleStyles = (
  isDyslexiaMode: boolean,
  isDarkMode: boolean,
  articleFontSize: number,
  isHighContrast = false,
) => {
  // High contrast wins over dark/dyslexia backgrounds: the issue's core
  // use case is low-vision users reading articles.
  const backgroundColor = isHighContrast
    ? '#000000'
    : isDarkMode
      ? '#121212'
      : isDyslexiaMode
        ? '#FDF4E3'
        : '#FFFFFF';
  const textColor = isHighContrast
    ? '#FFFFFF'
    : isDarkMode
      ? '#F8FAFC'
      : '#1A1A1A';
  const headingColor = isHighContrast
    ? '#FFFFFF'
    : isDarkMode
      ? '#FFFFFF'
      : '#0F172A';
  const linkColor = isHighContrast
    ? '#FFD700'
    : isDarkMode
      ? '#60A5FA'
      : '#0F52BA';

  return `
    @font-face {
      font-family: 'OpenDyslexic';
      src: url('https://cdn.jsdelivr.net/npm/opendyslexic@3/Compiled/OpenDyslexic-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    * {
      box-sizing: border-box;
    }
    html, body { 
      background-color: ${backgroundColor} !important; 
      color: ${textColor} !important;
      font-family: ${isDyslexiaMode ? DYSLEXIA_FONT_FAMILY : DEFAULT_FONT_FAMILY} !important; 
      font-size: ${articleFontSize}px !important; 
      line-height: ${isDyslexiaMode ? 2.0 : 1.6} !important;
      margin: 0;
      padding: 0;
      ${isDyslexiaMode ? `
        letter-spacing: 0.15em !important;
        word-spacing: 0.35em !important;
      ` : ''}
    }
    p, li, ul, ol, blockquote, span, div { 
      font-family: ${isDyslexiaMode ? DYSLEXIA_FONT_FAMILY : DEFAULT_FONT_FAMILY} !important;
      color: ${textColor} !important;
      background-color: transparent !important;
      ${isDyslexiaMode ? `
        line-height: 2.0 !important;
        letter-spacing: 0.15em !important;
        word-spacing: 0.35em !important;
      ` : ''}
    }
    h1, h2, h3, h4, h5, h6 {
      color: ${headingColor} !important;
      background-color: transparent !important;
      font-family: ${isDyslexiaMode ? DYSLEXIA_FONT_FAMILY : DEFAULT_FONT_FAMILY} !important;
    }
    a {
      color: ${linkColor} !important;
    }
    p, li, ul, ol, blockquote { 
      font-size: ${articleFontSize}px !important; 
      ${isDyslexiaMode ? 'margin-bottom: 1.5em !important;' : ''}
    }
    img, video, iframe, svg { max-width: 100% !important; height: auto; }
    table { display: block !important; max-width: 100% !important; overflow-x: auto !important; }
    pre, code { max-width: 100% !important; white-space: pre-wrap !important; overflow-wrap: anywhere !important; }
  `;
};
