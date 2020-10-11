import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../borderColor";

describe("borderColor", () => {
  const sides = ["", "x", "y", "t", "b", "l", "r", "e", "s"];
  const shouldMatch = generateInput("border", sides, ["red-500"]);
  const shouldNotMatch = generateInput("border", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, { shouldMatch, shouldNotMatch });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
