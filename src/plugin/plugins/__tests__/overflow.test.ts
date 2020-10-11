import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../overflow";

describe("overflow", () => {
  const shouldMatch = [
    "overflow-hidden",
    "overflow-visible",
    "overflow-scroll",
  ];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["overflow-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
