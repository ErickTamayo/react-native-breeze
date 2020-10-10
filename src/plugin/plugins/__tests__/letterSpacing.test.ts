import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../letterSpacing";

describe("letterSpacing", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["tracking-normal", "tracking-wider"],
    shouldNotMatch: ["tracking-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["tracking-normal", { letterSpacing: 0 }],
    ["tracking-wider", { letterSpacing: 0.8 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "tracking-normal",
    themeReturnType: { normal: "1" },
  });
});
