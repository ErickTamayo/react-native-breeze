import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../fontWeight";

describe("fontWeight", () => {
  // prettier-ignore
  const shouldMatch = generateInput("font", ["hairline", "thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["font-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
