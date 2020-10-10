import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../zIndex";

describe("zIndex", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["z-10", "z-20"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["z-10", { zIndex: 10 }],
    ["z-20", { zIndex: 20 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "z-10",
    themeReturnType: { 10: "10" },
  });
});
