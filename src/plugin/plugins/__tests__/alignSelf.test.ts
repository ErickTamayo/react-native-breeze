import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../alignSelf";

describe("alignSelf", () => {
  // prettier-ignore
  const shouldMatch = generateInput('self', ['auto', 'start', 'end', 'center', 'baseline', 'stretch'])

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "self-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
