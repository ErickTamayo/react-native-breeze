const MockDate = require("mockdate");

export const FRAME_TIME = 10;

export const advanceOneFrame = () => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
};

export const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  // Step through each of the frames until we've ran them all
  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed++;
  }
};

export const setupTimeTravel = () => {
  MockDate.set(0);
  jest.useFakeTimers();
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: jest.fn((selector) => selector.ios),
}));

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  const originalModule = jest.requireActual(
    "react-native/Libraries/Utilities/Dimensions"
  );

  return {
    ...originalModule,
    get: jest.fn(() => ({ height: 10, width: 5 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, FRAME_TIME);
};
