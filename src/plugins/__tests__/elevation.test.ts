import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../elevation";

describe("elevation", () => {
  // prettier-ignore
  const shouldMatch = generateInput("elevated", [ "", "sm", "md", "lg", "xl", "2xl"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unkwnown", "elevated-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
