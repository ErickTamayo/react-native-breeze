import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../fontVariant";

describe("fontVariant", () => {
  // prettier-ignore
  const shouldMatch = ["small-caps", "oldstyle-nums", "lining-nums", "tabular-nums", "proportional-nums"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
