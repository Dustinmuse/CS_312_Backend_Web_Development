const nextJest = require("next/jest");

// Pull in Next.js Jest defaults (SWC transform, module handling, etc.).
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  // Default to a browser-like environment for component tests.
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

module.exports = createJestConfig(customJestConfig);
