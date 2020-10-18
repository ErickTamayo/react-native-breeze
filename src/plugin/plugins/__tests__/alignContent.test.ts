import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../alignContent";

describe("alignContent", () => {
  // prettier-ignore
  const shouldMatch = generateInput('content', ['center', 'start', 'end', 'between', 'around', 'stretch'])

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "content-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
