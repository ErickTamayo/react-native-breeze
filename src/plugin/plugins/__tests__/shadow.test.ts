import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../shadow";

describe("shadow", () => {
  // prettier-ignore
  const shouldMatch = generateInput("shadow", ["", "sm", "md", "lg" , "xl", "2xl", "none"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["shadow-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
