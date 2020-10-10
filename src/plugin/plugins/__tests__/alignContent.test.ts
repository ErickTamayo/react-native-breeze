import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../alignContent";

describe("alignContent", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "content-center",
      "content-start",
      "content-end",
      "content-between",
      "content-around",
      "content-stretch",
    ],
    shouldNotMatch: ["unknown", "content-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["content-center", { alignContent: "center" }],
    ["content-start", { alignContent: "flex-start" }],
    ["content-end", { alignContent: "flex-end" }],
    ["content-stretch", { alignContent: "stretch" }],
    ["content-between", { alignContent: "space-between" }],
    ["content-around", { alignContent: "space-around" }],
  ]);
});
