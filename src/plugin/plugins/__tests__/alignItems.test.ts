import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../alignItems";

describe("alignItems", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "items-start",
      "items-end",
      "items-center",
      "items-baseline",
      "items-stretch",
    ],
    shouldNotMatch: ["unknown", "items-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["items-center", { alignItems: "center" }],
    ["items-start", { alignItems: "flex-start" }],
    ["items-end", { alignItems: "flex-end" }],
    ["items-stretch", { alignItems: "stretch" }],
    ["items-baseline", { alignItems: "baseline" }],
  ]);
});
