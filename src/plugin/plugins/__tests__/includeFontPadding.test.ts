import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../includeFontPadding";

describe("includeFontPadding", () => {
  const shouldMatch = ["no-font-padding", "font-padding"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "font-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
