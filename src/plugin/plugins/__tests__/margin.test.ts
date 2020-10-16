import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldMatchOutputSnapshot,
} from "../../helpers/tests";
import { pattern, plugin } from "../margin";

describe("margin", () => {
  const inputs = [
    ...generateInput("-m", ["1", "2", "3", "4"]),
    ...generateInput("-my", ["1", "2", "3", "4"]),
    ...generateInput("-mx", ["1", "2", "3", "4"]),
    ...generateInput("-mt", ["1", "2", "3", "4"]),
    ...generateInput("-mr", ["1", "2", "3", "4"]),
    ...generateInput("-mb", ["1", "2", "3", "4"]),
    ...generateInput("-ml", ["1", "2", "3", "4"]),
    ...generateInput("-ms", ["1", "2", "3", "4"]),
    ...generateInput("-me", ["1", "2", "3", "4"]),
    ...generateInput("m", ["1", "2", "3", "4"]),
    ...generateInput("my", ["1", "2", "3", "4"]),
    ...generateInput("mx", ["1", "2", "3", "4"]),
    ...generateInput("mt", ["1", "2", "3", "4"]),
    ...generateInput("mr", ["1", "2", "3", "4"]),
    ...generateInput("mb", ["1", "2", "3", "4"]),
    ...generateInput("ml", ["1", "2", "3", "4"]),
    ...generateInput("ms", ["1", "2", "3", "4"]),
    ...generateInput("me", ["1", "2", "3", "4"]),
  ];

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch: inputs,
    shouldNotMatch: ["unknown", "m-unknown", "-m-unknown"],
  });

  shouldMatchOutputSnapshot(pattern, plugin, inputs);
});
