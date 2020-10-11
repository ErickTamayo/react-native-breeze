import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../borderStyle";

describe("borderStyle", () => {
  const shouldMatch = generateInput("border", ["solid", "dotted", "dashed"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "border-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
