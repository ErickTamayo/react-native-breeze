import { pattern, plugin } from "../justifyContent";
import {
  shouldEvaluateTheCorrectPatternTest,
  generateInput,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";

describe("justifyContent", () => {
  // prettier-ignore
  const shouldMatch = generateInput('justify', ['start', 'end', 'center', 'between', 'around', 'evenly'])

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "justify-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
