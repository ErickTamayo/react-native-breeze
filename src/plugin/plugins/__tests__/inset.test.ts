import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../inset";

describe("inset", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "inset-0",
      "inset-y-0",
      "inset-x-0",
      "top-0",
      "right-0",
      "left-0",
      "bottom-0",
      "start-0",
      "end-0",
    ],
    shouldNotMatch: [
      "inset",
      "inset-y",
      "inset-x",
      "left",
      "right",
      "bottom",
      "start",
      "end",
    ],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["inset-0", { top: 0, right: 0, bottom: 0, left: 0 }],
    ["inset-x-0", { right: 0, left: 0 }],
    ["inset-y-0", { top: 0, bottom: 0 }],
    ["top-0", { top: 0 }],
    ["right-0", { right: 0 }],
    ["bottom-0", { bottom: 0 }],
    ["left-0", { left: 0 }],
    ["start-0", { start: 0 }],
    ["end-0", { end: 0 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "inset-0",
    themeReturnType: { 0: "0" },
  });
});
