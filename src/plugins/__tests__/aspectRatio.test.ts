import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../aspectRatio";

describe("aspectRatio", () => {
  // prettier-ignore
  const shouldMatch = generateInput("aspect-ratio", ["1"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "aspect-ratio-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
