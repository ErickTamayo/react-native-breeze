import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../width";

describe("width", () => {
  const shouldMatch = generateInput("w", ["1", "2", "3", "4", "5", "6", "8"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "w-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
