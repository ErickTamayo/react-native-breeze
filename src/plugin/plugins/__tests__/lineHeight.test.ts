import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../lineHeight";

describe("lineHeight", () => {
  const shouldMatch = generateInput("leading", ["3", "4", "5", "6", "7", "8"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "leading-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
