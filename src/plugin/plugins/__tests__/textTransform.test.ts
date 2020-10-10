import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../textTransform";

describe("textTransform", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["uppercase", "lowercase", "capitalize", "normal-case"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["uppercase", { textTransform: "uppercase" }],
    ["lowercase", { textTransform: "lowercase" }],
    ["capitalize", { textTransform: "capitalize" }],
    ["normal-case", { textTransform: "none" }],
  ]);
});
