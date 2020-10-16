import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../overflow";

describe("overflow", () => {
  // prettier-ignore
  const shouldMatch = generateInput("overflow", ["hidden", "visible", "scroll"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["overflow-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
