import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../direction";

describe("direction", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["direction-inherit", "direction-ltr", "direction-rtl"],
    shouldNotMatch: ["direction", "unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["direction-inherit", { direction: "inherit" }],
    ["direction-ltr", { direction: "ltr" }],
    ["direction-rtl", { direction: "rtl" }],
  ]);
});
