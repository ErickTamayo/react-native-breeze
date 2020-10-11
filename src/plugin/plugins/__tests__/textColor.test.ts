import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../textColor";

describe("textColor", () => {
  const shouldMatch = ["text-green-500", "text-black"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["text-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
