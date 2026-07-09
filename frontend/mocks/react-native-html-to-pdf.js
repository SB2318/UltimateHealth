// Web mock for react-native-html-to-pdf

const RNHTMLtoPDF = {
  generate: async () => ({ filePath: '' }),
  convert: async () => ({ filePath: '' }),
};

const generatePDF = RNHTMLtoPDF.generate;

export { generatePDF };
export default RNHTMLtoPDF;
