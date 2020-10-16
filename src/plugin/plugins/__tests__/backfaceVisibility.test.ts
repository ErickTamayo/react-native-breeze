import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../backfaceVisibility";

describe("backface", () => {
  const shouldMatch = generateInput("backface", ["hidden", "visible"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
