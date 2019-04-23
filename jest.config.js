module.exports = {
  verbose: true,
  notify: true,
  notifyMode: "always",
  preset: "ts-jest",
  setupFiles: [
    "<rootDir>/test-config/enzyme.ts",
    "<rootDir>/test-config/jsdom.ts"
  ]
};
