import { pattern, plugin } from "../flexDirection";
import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";

describe("flexDirection", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex", [''], ["row" , "row-reverse" , "column" , "column-reverse"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
