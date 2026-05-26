import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import storybook from "eslint-plugin-storybook";
import i18next from "eslint-plugin-i18next";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';

export default defineConfig([
  globalIgnores(["dist", "node_modules", "storybook-static", "coverage"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      ...storybook.configs["flat/recommended"],
      prettier,
    ],

    plugins: {
      i18next,
    },

    rules: {
      "i18next/no-literal-string": [
        "warn",
        {
          markupOnly: true,
        },
      ],
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
