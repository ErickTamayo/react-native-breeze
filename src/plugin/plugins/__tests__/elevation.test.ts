import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../elevation";

describe("elevation", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["elevated", "elevated-md"],
    shouldNotMatch: ["unkwnown", "elevated-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["elevated", { elevation: 1 }],
    ["elevated-md", { elevation: 4 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "elevated",
    themeReturnType: { default: "2" },
  });
});
