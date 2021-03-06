import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../overlayColor";

describe("overlayColor", () => {
  const shouldMatch = ["overlay-green-500", "overlay-black"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["overlay-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
