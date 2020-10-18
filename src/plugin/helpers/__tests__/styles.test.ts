import { generateStyleFromInput, PlatformStyles } from "../styles";

describe("helpers/styles", () => {
  const scenario0: [input: string, expected: PlatformStyles] = ["", {}];

  const scenario1: [input: string, expected: PlatformStyles] = [
    "text-gray-500",
    { default: { base: { all: { color: "#a0aec0" } } } },
  ];

  const scenario2: [input: string, expected: PlatformStyles] = [
    "text-gray-100 ios:text-gray-200 android:text-gray-300 web:text-gray-400 native:text-gray-500",
    {
      default: {
        base: { all: { color: "#f7fafc" } },
      },
      ios: {
        base: { all: { color: "#edf2f7" } },
      },
      android: {
        base: { all: { color: "#e2e8f0" } },
      },
      web: {
        base: { all: { color: "#cbd5e0" } },
      },
      native: {
        base: { all: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario3: [input: string, expected: PlatformStyles] = [
    "focus:text-gray-100 ios:focus:text-gray-200 android:focus:text-gray-300 web:focus:text-gray-400 native:focus:text-gray-500",
    {
      default: {
        focus: { all: { color: "#f7fafc" } },
      },
      ios: {
        focus: { all: { color: "#edf2f7" } },
      },
      android: {
        focus: { all: { color: "#e2e8f0" } },
      },
      web: {
        focus: { all: { color: "#cbd5e0" } },
      },
      native: {
        focus: { all: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario4: [input: string, expected: PlatformStyles] = [
    "sm:text-gray-100 ios:sm:text-gray-200 android:sm:text-gray-300 web:sm:text-gray-400 native:sm:text-gray-500",
    {
      default: {
        base: { 640: { color: "#f7fafc" } },
      },
      ios: {
        base: { 640: { color: "#edf2f7" } },
      },
      android: {
        base: { 640: { color: "#e2e8f0" } },
      },
      web: {
        base: { 640: { color: "#cbd5e0" } },
      },
      native: {
        base: { 640: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario5: [input: string, expected: PlatformStyles] = [
    "sm:focus:text-gray-100 ios:sm:focus:text-gray-200 android:sm:focus:text-gray-300 web:sm:focus:text-gray-400 native:sm:focus:text-gray-500",
    {
      default: {
        focus: { 640: { color: "#f7fafc" } },
      },
      ios: {
        focus: { 640: { color: "#edf2f7" } },
      },
      android: {
        focus: { 640: { color: "#e2e8f0" } },
      },
      web: {
        focus: { 640: { color: "#cbd5e0" } },
      },
      native: {
        focus: { 640: { color: "#a0aec0" } },
      },
    },
  ];

  it.each([scenario0, scenario1, scenario2, scenario3, scenario4, scenario5])(
    'should generate style "%s" correctly',
    (input, expected) => {
      expect(generateStyleFromInput(input)).toEqual(expected);
    }
  );
});
