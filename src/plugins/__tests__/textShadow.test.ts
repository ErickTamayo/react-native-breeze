import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../textShadow";

describe("textShadow", () => {
  // prettier-ignore
  const shouldMatch = generateInput("text-shadow", ["", "sm", "md", "lg" , "xl", "2xl", "none"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["text-shadow-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
