/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["workspace:@repo/eslint-config/library.js"], // Make sure it's a workspace reference
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
}
