import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../includeFontPadding";

describe("includeFontPadding", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["no-font-padding", "font-padding"],
    shouldNotMatch: ["unknown", "font-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["no-font-padding", { includeFontPadding: false }],
    ["font-padding", { includeFontPadding: true }],
  ]);
});
