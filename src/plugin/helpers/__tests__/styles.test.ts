import { generateStyleFromInput, BreezeStyle } from "../styles";

describe("helpers/styles", () => {
  const scenario0: [input: string, expected: BreezeStyle] = ["", {}];

  const scenario1: [input: string, expected: BreezeStyle] = [
    "text-gray-500",
    { default: { all: { base: { color: "#a0aec0" } } } },
  ];

  const scenario2: [input: string, expected: BreezeStyle] = [
    "text-gray-100 ios:text-gray-200 android:text-gray-300 web:text-gray-400 native:text-gray-500",
    {
      default: {
        all: { base: { color: "#f7fafc" } },
      },
      ios: {
        all: { base: { color: "#edf2f7" } },
      },
      android: {
        all: { base: { color: "#e2e8f0" } },
      },
      web: {
        all: { base: { color: "#cbd5e0" } },
      },
      native: {
        all: { base: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario3: [input: string, expected: BreezeStyle] = [
    "focus:text-gray-100 ios:focus:text-gray-200 android:focus:text-gray-300 web:focus:text-gray-400 native:focus:text-gray-500",
    {
      default: {
        all: { focus: { color: "#f7fafc" } },
      },
      ios: {
        all: { focus: { color: "#edf2f7" } },
      },
      android: {
        all: { focus: { color: "#e2e8f0" } },
      },
      web: {
        all: { focus: { color: "#cbd5e0" } },
      },
      native: {
        all: { focus: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario4: [input: string, expected: BreezeStyle] = [
    "sm:text-gray-100 ios:sm:text-gray-200 android:sm:text-gray-300 web:sm:text-gray-400 native:sm:text-gray-500",
    {
      default: {
        640: { base: { color: "#f7fafc" } },
      },
      ios: {
        640: { base: { color: "#edf2f7" } },
      },
      android: {
        640: { base: { color: "#e2e8f0" } },
      },
      web: {
        640: { base: { color: "#cbd5e0" } },
      },
      native: {
        640: { base: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario5: [input: string, expected: BreezeStyle] = [
    "sm:focus:text-gray-100 ios:sm:focus:text-gray-200 android:sm:focus:text-gray-300 web:sm:focus:text-gray-400 native:sm:focus:text-gray-500",
    {
      default: {
        640: { focus: { color: "#f7fafc" } },
      },
      ios: {
        640: { focus: { color: "#edf2f7" } },
      },
      android: {
        640: { focus: { color: "#e2e8f0" } },
      },
      web: {
        640: { focus: { color: "#cbd5e0" } },
      },
      native: {
        640: { focus: { color: "#a0aec0" } },
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
