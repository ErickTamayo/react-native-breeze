import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../flexShrink";

describe("flexShrink", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex-shrink", [''], ['', '0', '2', '3', '4', '5', ]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-shrink-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["flex-shrink", { flexShrink: 1 }],
    ["flex-shrink-2", { flexShrink: 2 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "flex-shrink",
    themeReturnType: { 1: "1" },
  });
});
