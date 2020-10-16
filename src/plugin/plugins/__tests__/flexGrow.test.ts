import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../flexGrow";

describe("flexGrow", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex-grow", ["", "0", "2", "3", "4", "5"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-grow-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
