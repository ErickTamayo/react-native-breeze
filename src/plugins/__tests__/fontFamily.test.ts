import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../fontFamily";

describe("fontFamily", () => {
  const shouldMatch = generateInput("font", ["sans", "serif"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "font-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
