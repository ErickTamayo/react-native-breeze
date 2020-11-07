const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  ...tsjPreset,
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    // ...tsjPreset.transform,
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  // cacheDirectory: "<rootDir>/.jest/cache",
  // setupFiles: ["<rootDir>/jest.setup.js"],
  // setupFilesAfterEnv: ["@testing-library/react-native/cleanup-after-each"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/plugin/"],
  // transformIgnorePatterns: [
  //   "node_modules/(?!(react-native" +
  //     "|react-navigation-tabs" +
  //     "|react-native-splash-screen" +
  //     "|react-native-screens" +
  //     "|react-native-reanimated" +
  //     "|@testing-library/react-hooks" +
  //     ")/)",
  // ],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
