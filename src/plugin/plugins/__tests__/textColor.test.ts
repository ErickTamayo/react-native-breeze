import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../textColor";

describe("textColor", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["text-green-500", "text-black"],
    shouldNotMatch: ["text-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["text-red-500", { color: "#f56565" }],
    ["text-black", { color: "#000000" }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "text-red-500",
    themeReturnType: { red: { 500: 0 } },
  });
});
