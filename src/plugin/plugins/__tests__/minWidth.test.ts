import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../minWidth";

describe("minWidth", () => {
  // prettier-ignore
  const shouldMatch = generateInput('min-w', ['0', 'full']);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["min-w-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
