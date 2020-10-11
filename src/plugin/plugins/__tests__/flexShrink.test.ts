import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../flexShrink";

describe("flexShrink", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex-shrink", ["", "0", "2", "3", "4", "5"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-shrink-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
