// ESLint's configuration for the repository's lint (`npm run lint` at the root): the recommended JavaScript rules over
// every demo's own scripts, which run in the browser as modules, and their build configurations, which run in Node.
// The build outputs, dependencies and bundles are not linted.
//
// The demos are upstream code, kept as they are, so five recommended rules are off: the scripts use elements by their
// id as globals (no-undef), keep handler parameters and values they do not read (no-unused-vars), and use a few
// deliberate patterns (declarations in case clauses, assignments in conditions, an async promise executor) that a fix
// would have to rewrite. Every other recommended rule applies.
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["**/dist/", "**/node_modules/", "**/bundle.*"] },
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.browser },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-case-declarations": "off",
      "no-cond-assign": "off",
      "no-async-promise-executor": "off",
    },
  },
  {
    files: ["**/*.config.js", "**/*.config.cjs"],
    languageOptions: { globals: { ...globals.node } },
  },
];
