import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../tintColor";

describe("tintColor", () => {
  const shouldMatch = ["tint-green-500", "tint-black"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["tint-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
