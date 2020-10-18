import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../opacity";

describe("opacity", () => {
  const shouldMatch = generateInput("opacity", ["0", "25", "50", "75", "100"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["opacity-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
