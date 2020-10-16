import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../textDecoration";

describe("textDecoration", () => {
  // prettier-ignore
  const shouldMatch = ["no-underline", "underline", "line-through", "underline-double", "line-through-double", "underline-dotted", "line-through-dotted", "underline-dashed", "line-through-dashed"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
