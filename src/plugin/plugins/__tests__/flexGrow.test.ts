import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../flexGrow";

describe("flexGrow", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex-grow", [''], ['', '0', '2', '3', '4', '5', ]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-grow-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["flex-grow", { flexGrow: 1 }],
    ["flex-grow-2", { flexGrow: 2 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "flex-grow",
    themeReturnType: { 1: "1" },
  });
});
