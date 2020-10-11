import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../width";

describe("width", () => {
  const shouldMatch = ["w-1", "w-2"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "w-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
