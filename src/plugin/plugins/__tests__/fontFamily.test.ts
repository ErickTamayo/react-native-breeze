import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../fontFamily";

describe("fontFamily", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["font-sans", "font-serif"],
    shouldNotMatch: ["unknown", "font-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["font-sans", { fontFamily: "" }],
    ["font-serif", { fontFamily: "" }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "font-sans",
    themeReturnType: { sans: 1 },
  });
});
