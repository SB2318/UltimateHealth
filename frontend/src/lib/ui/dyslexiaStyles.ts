export const DYSLEXIA_FONT_FAMILY = "'OpenDyslexic', 'Comic Sans MS', 'Arial', sans-serif";
export const DEFAULT_FONT_FAMILY = "'Times New Roman'";

export const generateArticleStyles = (
  isDyslexiaMode: boolean,
  isDarkMode: boolean,
  articleFontSize: number,
) => {
  const backgroundColor = isDarkMode ? '#2D2D2D' : '#FDF4E3';
  const textColor = isDarkMode ? '#E0E0E0' : '#1A1A1A';

  return `
    @font-face {
      font-family: 'OpenDyslexic';
      src: url('https://cdn.jsdelivr.net/npm/opendyslexic@3/Compiled/OpenDyslexic-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    body { 
      font-family: ${isDyslexiaMode ? DYSLEXIA_FONT_FAMILY : DEFAULT_FONT_FAMILY} !important; 
      font-size: ${articleFontSize}px !important; 
      line-height: ${isDyslexiaMode ? 2.0 : 1.6} !important;
      ${isDyslexiaMode ? `
        letter-spacing: 0.15em !important;
        word-spacing: 0.35em !important;
        background-color: ${backgroundColor} !important; 
        color: ${textColor} !important; 
      ` : ''}
    }
    p, li, ul, ol, blockquote, h1, h2, h3, h4, h5, h6, span, div, a { 
      ${isDyslexiaMode ? `
        font-family: ${DYSLEXIA_FONT_FAMILY} !important;
        color: ${textColor} !important;
        line-height: 2.0 !important;
        letter-spacing: 0.15em !important;
        word-spacing: 0.35em !important;
      ` : ''}
    }
    p, li, ul, ol, blockquote { 
      font-size: ${articleFontSize}px !important; 
      ${isDyslexiaMode ? 'margin-bottom: 1.5em !important;' : ''}
    }
    img, video, iframe { max-width: 100%; height: auto; }
  `;
};
