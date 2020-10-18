import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../maxWidth";

describe("maxWidth", () => {
  // prettier-ignore
  const shouldMatch = generateInput('max-w', ['xs','sm',"md",'lg','xl','2xl','3xl','4xl','5xl','6xl']);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["max-w-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
