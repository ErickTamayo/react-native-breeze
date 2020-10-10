import { pattern, plugin, PluginGroups } from "../verticalAlign";
import { PluginFunctionReturnType } from "../types";
import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";

describe("verticalAlign", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: ["align-auto", "align-top", "align-bottom", "align-center"],
    shouldNotMatch: ["align-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["align-auto", { textAlignVertical: "auto" }],
    ["align-top", { textAlignVertical: "top" }],
    ["align-bottom", { textAlignVertical: "bottom" }],
    ["align-center", { textAlignVertical: "center" }],
  ]);
});
