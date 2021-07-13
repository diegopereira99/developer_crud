module.exports = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(scss|sass|css)$": "identity-obj-proxy"
    }
  };