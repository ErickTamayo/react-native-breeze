import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../fontStyle";

describe("fontStyle", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["italic", "not-italic"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["italic", { fontStyle: "italic" }],
    ["not-italic", { fontStyle: "normal" }],
  ]);
});
