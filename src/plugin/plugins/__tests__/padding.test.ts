import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../padding";

describe("padding", () => {
  const inputs = [
    ...generateInput("p", ["1", "2", "3", "4"]),
    ...generateInput("py", ["1", "2", "3", "4"]),
    ...generateInput("px", ["1", "2", "3", "4"]),
    ...generateInput("pt", ["1", "2", "3", "4"]),
    ...generateInput("pr", ["1", "2", "3", "4"]),
    ...generateInput("pb", ["1", "2", "3", "4"]),
    ...generateInput("pl", ["1", "2", "3", "4"]),
    ...generateInput("ps", ["1", "2", "3", "4"]),
    ...generateInput("pe", ["1", "2", "3", "4"]),
  ];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: inputs,
    shouldNotMatch: ["unknown", "p-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, inputs);
});
