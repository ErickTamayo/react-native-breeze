import { pattern, plugin } from "../flexWrap";
import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";

describe("flexWrap", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex", [ "wrap", "no-wrap", "wrap-reverse"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
