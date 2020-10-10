import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../fontSize";

describe("fontSize", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["text-xs", "text-sm"],
    shouldNotMatch: ["unknown", "text-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["text-xs", { fontSize: 12 }],
    ["text-sm", { fontSize: 14 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "text-xs",
    themeReturnType: { xs: "1" },
  });
});
