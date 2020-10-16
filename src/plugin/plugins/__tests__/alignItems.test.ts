import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../alignItems";

describe("alignItems", () => {
  // prettier-ignore
  const shouldMatch = generateInput('items', ['start', 'end', 'center', 'baseline', 'stretch'])

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "items-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
