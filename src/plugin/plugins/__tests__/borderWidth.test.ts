import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../borderWidth";

describe("borderWidth", () => {
  // prettier-ignore
  const sides = ["", "t", "r", "b", "l", "s", "e", "tl", "tr", "ts", "te", "bl", "br", "bs", "be"];
  const shouldMatch = generateInput("border", sides, ["", "2"]);
  const shouldNotMatch = generateInput("border", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, {
    shouldMatch,
    shouldNotMatch,
  });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["border", { borderWidth: 1 }],
    ["border-t", { borderTopWidth: 1 } as any], //TODO check why this typing is failing
    ["border-r", { borderRightWidth: 1 }],
    ["border-b", { borderBottomWidth: 1 }],
    ["border-l", { borderLeftWidth: 1 }],
    ["border-s", { borderStartWidth: 1 }],
    ["border-e", { borderEndWidth: 1 }],
    ["border-tl", { borderTopLeftWidth: 1 }],
    ["border-tr", { borderTopRightWidth: 1 }],
    ["border-br", { borderBottomRightWidth: 1 }],
    ["border-bl", { borderBottomLeftWidth: 1 }],
    ["border-2", { borderWidth: 2 }],
    ["border-t-2", { borderTopWidth: 2 } as any], //TODO check why this typing is failing
    ["border-r-2", { borderRightWidth: 2 }],
    ["border-b-2", { borderBottomWidth: 2 }],
    ["border-l-2", { borderLeftWidth: 2 }],
    ["border-s-2", { borderStartWidth: 2 }],
    ["border-e-2", { borderEndWidth: 2 }],
    ["border-tl-2", { borderTopLeftWidth: 2 }],
    ["border-tr-2", { borderTopRightWidth: 2 }],
    ["border-br-2", { borderBottomRightWidth: 2 }],
    ["border-bl-2", { borderBottomLeftWidth: 2 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "border-r-2",
    themeReturnType: { 2: "2" },
  });
});
