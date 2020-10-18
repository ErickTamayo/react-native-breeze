import { pattern, plugin } from "../verticalAlign";
import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";

describe("verticalAlign", () => {
  // prettier-ignore
  const shouldMatch = generateInput("align", ["auto", "top", "bottom", "center"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["align-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
