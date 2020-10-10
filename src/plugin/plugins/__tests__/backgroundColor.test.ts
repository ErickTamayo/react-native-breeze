import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../backgroundColor";

describe("backgroundColor", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["bg-green-500", "bg-black"],
    shouldNotMatch: ["bg-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["bg-red-500", { backgroundColor: "#f56565" }],
    ["bg-black", { backgroundColor: "#000000" }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    themeReturnType: { "red-500": 0 },
    input: "bg-red-500",
  });
});
