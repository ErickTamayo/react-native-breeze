import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../textDecoration";

describe("textDecoration", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "no-underline",
      "underline",
      "line-through",
      "underline-double",
      "line-through-double",
      "underline-dotted",
      "line-through-dotted",
      "underline-dashed",
      "line-through-dashed",
    ],
    shouldNotMatch: ["unknown"],
  });

  // prettier-ignore
  shouldParseCorrectlyTest(pattern, plugin, [
    ["no-underline", { textDecorationLine: "none" }],
    ["underline", { textDecorationLine: "underline", textDecorationStyle: "solid" }],
    ["underline-double", { textDecorationLine: "underline", textDecorationStyle: "double" }],
    ["underline-dotted", { textDecorationLine: "underline", textDecorationStyle: "dotted" }],
    ["underline-dashed", { textDecorationLine: "underline", textDecorationStyle: "dashed" }],
    ["line-through", { textDecorationLine: "line-through", textDecorationStyle: "solid" }],
    ["line-through-double", { textDecorationLine: "line-through", textDecorationStyle: "double" }],
    ["line-through-dotted", { textDecorationLine: "line-through", textDecorationStyle: "dotted" }],
    ["line-through-dashed", { textDecorationLine: "line-through", textDecorationStyle: "dashed" }]
  ])
});
