import {
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../backgroundColor";

describe("backgroundColor", () => {
  const shouldMatch = ["bg-green-500", "bg-black"];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["bg-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, shouldMatch);
});
