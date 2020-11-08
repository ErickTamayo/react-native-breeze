import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../borderRadius";

describe("borderRadius", () => {
  // prettier-ignore
  const sides = ["", "t", "r", "b", "l", "s", "e", "tl", "tr", "ts", "te", "bl", "br", "bs", "be"];
  const shouldMatch = generateInput("rounded", sides, ["", "sm"]);
  const shouldNotMatch = generateInput("rounded", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, { shouldMatch, shouldNotMatch });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
