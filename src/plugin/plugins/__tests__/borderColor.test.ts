import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../borderColor";

describe("borderColor", () => {
  const sides = ["", "x", "y", "t", "b", "l", "r", "e", "s"];
  const shouldMatch = generateInput("border", sides, ["red-500"]);
  const shouldNotMatch = generateInput("border", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, { shouldMatch, shouldNotMatch });

  // prettier-ignore
  shouldParseCorrectlyTest(pattern, plugin,
  [
    ["border-red-500", { borderColor: "#f56565" }],
    ["border-x-red-500", { borderLeftColor: "#f56565", borderRightColor: "#f56565" }],
    ["border-y-red-500", { borderTopColor: "#f56565", borderBottomColor: "#f56565" }],
    ["border-t-red-500", { borderTopColor: "#f56565" }],
    ["border-b-red-500", { borderBottomColor: "#f56565" }],
    ["border-l-red-500", { borderLeftColor: "#f56565" }],
    ["border-r-red-500", { borderRightColor: "#f56565" }],
    ["border-s-red-500", { borderStartColor: "#f56565" }],
    ["border-e-red-500", { borderEndColor: "#f56565" }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "border-red-500",
    themeReturnType: { "red-500": 0 },
  });
});
