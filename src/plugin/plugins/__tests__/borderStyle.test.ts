import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../borderStyle";

describe("borderStyle", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["border-solid", "border-dotted", "border-dashed"],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["border-solid", { borderStyle: "solid" }],
    ["border-dotted", { borderStyle: "dotted" }],
    ["border-dashed", { borderStyle: "dashed" }],
  ]);
});
