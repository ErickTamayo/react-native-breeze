import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../lineHeight";

describe("lineHeight", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["leading-3", "leading-4"],
    shouldNotMatch: ["unknown", "leading-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["leading-3", { lineHeight: 12 }],
    ["leading-4", { lineHeight: 16 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "leading-3",
    themeReturnType: { 3: "12" },
  });
});
