import {
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";
import { pattern, plugin } from "../fontVariant";

describe("fontVariant", () => {
  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: [
      "small-caps",
      "oldstyle-nums",
      "lining-nums",
      "tabular-nums",
      "proportional-nums",
    ],
    shouldNotMatch: ["unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["small-caps", { fontVariant: ["small-caps"] }],
    ["oldstyle-nums", { fontVariant: ["oldstyle-nums"] }],
    ["lining-nums", { fontVariant: ["lining-nums"] }],
    ["tabular-nums", { fontVariant: ["tabular-nums"] }],
    ["proportional-nums", { fontVariant: ["proportional-nums"] }],
  ]);
});
