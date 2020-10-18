import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../flexBasis";

describe("flexBasis", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex-basis", ["1", "2", "3", "4", "5", "6", "8"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-basis-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
