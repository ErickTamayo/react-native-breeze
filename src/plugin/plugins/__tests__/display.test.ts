import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../display";

describe("display", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["hidden", "flex"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["hidden", { display: "none" }],
    ["flex", { display: "flex" }],
  ]);
});
