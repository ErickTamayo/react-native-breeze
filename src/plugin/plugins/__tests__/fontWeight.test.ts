import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../fontWeight";

describe("fontWeight", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["font-normal", "font-medium"],
    shouldNotMatch: ["font-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["font-normal", { fontWeight: "400" }],
    ["font-medium", { fontWeight: "500" }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "font-normal",
    themeReturnType: { normal: 0 },
  });
});
