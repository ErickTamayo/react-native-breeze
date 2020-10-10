import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../overflow";

describe("overflow", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["overflow-hidden", "overflow-visible", "overflow-scroll"],
    shouldNotMatch: ["overflow-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["overflow-hidden", { overflow: "hidden" }],
    ["overflow-visible", { overflow: "visible" }],
    ["overflow-scroll", { overflow: "scroll" }],
  ]);
});
