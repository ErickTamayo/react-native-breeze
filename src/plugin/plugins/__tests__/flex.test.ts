import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../flex";

describe("flex", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["flex-1", "flex-2"],
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["flex-1", { flex: 1 }],
    ["flex-10", { flex: 10 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "flex-1",
    themeReturnType: { 1: "1" },
  });
});
