import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../utils/tests";
import { pattern, plugin } from "../letterSpacing";

describe("letterSpacing", () => {
  // prettier-ignore
  const shouldMatch = generateInput("tracking", ["tighter", "tight", "normal", "wide", "wider", "widest"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["tracking-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
