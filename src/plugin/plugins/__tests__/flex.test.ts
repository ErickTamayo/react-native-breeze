import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../flex";

describe("flex", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
