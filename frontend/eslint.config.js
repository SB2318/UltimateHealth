// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const modifiedExpoConfig = (Array.isArray(expoConfig) ? expoConfig : [expoConfig]).map(config => {
  if (config.rules) {
    const newRules = { ...config.rules };
    delete newRules['react-compiler/react-compiler'];
    return { ...config, rules: newRules };
  }
  return config;
});

module.exports = defineConfig([
  ...modifiedExpoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      'react-compiler': require('eslint-plugin-react-compiler'),
    },
    rules: {
      "react/display-name": "off",
      "import/no-unresolved": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/no-unescaped-entities": "off",
      "react-compiler/react-compiler": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/globals": "off",
      "react-hooks/static-components": "off"
    }
  },
]);
