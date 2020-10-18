import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../minHeight";

describe("minHeight", () => {
  const shouldMatch = ["min-h-0", "min-h-full"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["min-h-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
