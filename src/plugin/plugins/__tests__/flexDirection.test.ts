import { pattern, plugin } from "../flexDirection";
import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
} from "../../utils/tests";

describe("flexDirection", () => {
  // prettier-ignore
  const shouldMatch = generateInput("flex", [''], ["row" , "row-reverse" , "column" , "column-reverse"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch: ["unknown", "flex-unknown"],
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["flex-row", { flexDirection: "row" }],
    ["flex-row-reverse", { flexDirection: "row-reverse" }],
    ["flex-column", { flexDirection: "column" }],
    ["flex-column-reverse", { flexDirection: "column-reverse" }],
  ]);
});
