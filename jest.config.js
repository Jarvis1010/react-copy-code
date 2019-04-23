module.exports = {
  verbose: true,
  notify: true,
  notifyMode: "always",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: [
    "<rootDir>/test-config/enzyme.js",
    "<rootDir>/test-config/jsdom.js"
  ]
};
