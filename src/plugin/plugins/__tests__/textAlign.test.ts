import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../textAlign";

describe("textAlign", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["text-auto", "text-left", "text-right", "text-center"],
    shouldNotMatch: ["text-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["text-auto", { textAlign: "auto" }],
    ["text-left", { textAlign: "left" }],
    ["text-right", { textAlign: "right" }],
    ["text-center", { textAlign: "center" }],
  ]);
});
