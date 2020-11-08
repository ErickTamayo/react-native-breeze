import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../textAlign";

describe("textAlign", () => {
  // prettier-ignore
  const shouldMatch = generateInput("text", ["auto", "left", "right", "center"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["text-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
