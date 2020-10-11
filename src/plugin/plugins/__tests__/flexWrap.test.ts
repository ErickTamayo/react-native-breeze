import { pattern, plugin } from "../flexWrap";
import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";

describe("flexWrap", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["flex-wrap", "flex-no-wrap", "flex-wrap-reverse"],
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["flex-wrap", { flexWrap: "wrap" }],
    ["flex-no-wrap", { flexWrap: "nowrap" }],
    ["flex-wrap-reverse", { flexWrap: "wrap-reverse" }],
  ]);
});
