// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');


module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      "react/display-name": "off",
      "import/no-unresolved": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/no-unescaped-entities": "off"
    }
  },
]);
