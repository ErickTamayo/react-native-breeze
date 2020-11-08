const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/plugin/"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
