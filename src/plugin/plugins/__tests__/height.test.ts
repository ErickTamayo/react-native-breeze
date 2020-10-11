import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../height";

describe("height", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["h-1", "h-2"],
    shouldNotMatch: ["unknown", "h-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["h-1", { height: 4 }],
    ["h-2", { height: 8 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "h-1",
    themeReturnType: { 1: "1" },
  });
});
