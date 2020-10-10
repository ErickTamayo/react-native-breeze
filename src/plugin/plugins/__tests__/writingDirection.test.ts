import { pattern, plugin } from "../writingDirection";
import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";

describe("writingDirection", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["writing-auto", "writing-ltr", "writing-rtl"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["writing-auto", { writingDirection: "auto" }],
    ["writing-ltr", { writingDirection: "ltr" }],
    ["writing-rtl", { writingDirection: "rtl" }],
  ]);
});
