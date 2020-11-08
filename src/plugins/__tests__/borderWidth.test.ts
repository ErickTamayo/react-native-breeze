import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../borderWidth";

describe("borderWidth", () => {
  // prettier-ignore
  const sides = ["", "t", "r", "b", "l", "s", "e", "tl", "tr", "ts", "te", "bl", "br", "bs", "be"];
  const shouldMatch = generateInput("border", sides, ["", "2"]);
  const shouldNotMatch = generateInput("border", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch,
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
