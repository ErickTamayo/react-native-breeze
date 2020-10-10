import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../alignSelf";

describe("alignSelf", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "self-auto",
      "self-start",
      "self-end",
      "self-center",
      "self-baseline",
      "self-stretch",
    ],
    shouldNotMatch: ["unknown", "self-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["self-auto", { alignSelf: "auto" }],
    ["self-center", { alignSelf: "center" }],
    ["self-start", { alignSelf: "flex-start" }],
    ["self-end", { alignSelf: "flex-end" }],
    ["self-stretch", { alignSelf: "stretch" }],
    ["self-baseline", { alignSelf: "baseline" }],
  ]);
});
