import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../maxHeight";

describe("maxHeight", () => {
  const shouldMatch = ["max-h-full"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["max-h-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
