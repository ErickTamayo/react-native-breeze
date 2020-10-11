import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../resizeMode";

describe("resizeMode", () => {
  const shouldMatch = generateInput("resize", [
    "cover",
    "contain",
    "stretch",
    "repeat",
    "center",
  ]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
