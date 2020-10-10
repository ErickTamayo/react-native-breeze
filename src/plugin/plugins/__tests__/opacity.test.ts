import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../opacity";

describe("opacity", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["opacity-25", "opacity-100"],
    shouldNotMatch: ["opacity-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["opacity-25", { opacity: 0.25 }],
    ["opacity-100", { opacity: 1 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    themeReturnType: { "25": "0.25" },
    input: "opacity-25",
  });
});
