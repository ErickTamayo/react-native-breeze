import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../inset";

describe("inset", () => {
  // prettier-ignore
  const shouldMatch = [ "inset-0", "inset-y-0", "inset-x-0", "top-0", "right-0", "left-0", "bottom-0", "start-0", "end-0"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: [
      "inset",
      "inset-y",
      "inset-x",
      "left",
      "right",
      "bottom",
      "start",
      "end",
    ],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
