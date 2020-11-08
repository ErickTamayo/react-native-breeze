import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../position";

describe("position", () => {
  const shouldMatch = ["absolute", "relative"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
