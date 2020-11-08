import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../fontSize";

describe("fontSize", () => {
  // prettier-ignore
  const shouldMatch = generateInput("text", ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "text-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
