import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../height";

describe("height", () => {
  const shouldMatch = generateInput("h", ["1", "2", "3", "4", "5", "6", "8"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "h-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
