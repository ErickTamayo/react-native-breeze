import { generateStyle, VariantsStyles } from "../styles";

describe("helpers/styles", () => {
  const scenario0: [string, VariantsStyles] = ["", {}];

  const scenario1: [string, VariantsStyles] = [
    "text-gray-500",
    { base: { default: { all: { color: "#a0aec0" } } } },
  ];

  const scenario2: [string, VariantsStyles] = [
    "text-gray-100 ios:text-gray-200 android:text-gray-300 web:text-gray-400 native:text-gray-500",
    {
      base: {
        default: { all: { color: "#f7fafc" } },
        ios: { all: { color: "#edf2f7" } },
        android: { all: { color: "#e2e8f0" } },
        web: { all: { color: "#cbd5e0" } },
        native: { all: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario3: [string, VariantsStyles] = [
    "focus:text-gray-100 ios:focus:text-gray-200 android:focus:text-gray-300 web:focus:text-gray-400 native:focus:text-gray-500",
    {
      focus: {
        default: { all: { color: "#f7fafc" } },
        ios: { all: { color: "#edf2f7" } },
        android: { all: { color: "#e2e8f0" } },
        web: { all: { color: "#cbd5e0" } },
        native: { all: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario4: [string, VariantsStyles] = [
    "sm:text-gray-100 ios:sm:text-gray-200 android:sm:text-gray-300 web:sm:text-gray-400 native:sm:text-gray-500",
    {
      base: {
        default: { sm: { color: "#f7fafc" } },
        ios: { sm: { color: "#edf2f7" } },
        android: { sm: { color: "#e2e8f0" } },
        web: { sm: { color: "#cbd5e0" } },
        native: { sm: { color: "#a0aec0" } },
      },
    },
  ];

  const scenario5: [string, VariantsStyles] = [
    "sm:focus:text-gray-100 ios:sm:focus:text-gray-200 android:sm:focus:text-gray-300 web:sm:focus:text-gray-400 native:sm:focus:text-gray-500",
    {
      focus: {
        default: { sm: { color: "#f7fafc" } },
        ios: { sm: { color: "#edf2f7" } },
        android: { sm: { color: "#e2e8f0" } },
        web: { sm: { color: "#cbd5e0" } },
        native: { sm: { color: "#a0aec0" } },
      },
    },
  ];

  it.each([scenario0, scenario1, scenario2, scenario3, scenario4, scenario5])(
    'should generate style "%s" correctly',
    (input, expected) => {
      expect(generateStyle(input)).toEqual(expected);
    }
  );
});
