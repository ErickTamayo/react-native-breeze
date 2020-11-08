import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../direction";

describe("direction", () => {
  const shouldMatch = generateInput("direction", ["inherit", "ltr", "rtl"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["direction", "unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
