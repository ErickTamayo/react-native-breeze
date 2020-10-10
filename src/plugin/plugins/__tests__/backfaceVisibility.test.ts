import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../backfaceVisibility";

describe("backface", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["backface-hidden", "backface-visible"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["backface-hidden", { backfaceVisibility: "hidden" }],
    ["backface-visible", { backfaceVisibility: "visible" }],
  ]);
});
