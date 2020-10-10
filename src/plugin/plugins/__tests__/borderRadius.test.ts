import {
  generateInput,
  shouldEvaluateTheCorrectPatternTest,
  shouldParseCorrectlyTest,
  wrongValueTest,
} from "../../utils/tests";
import { pattern, plugin } from "../borderRadius";

describe("borderRadius", () => {
  // prettier-ignore
  const sides = ["", "t", "r", "b", "l", "s", "e", "tl", "tr", "ts", "te", "bl", "br", "bs", "be"];
  const shouldMatch = generateInput("rounded", sides, ["", "sm"]);
  const shouldNotMatch = generateInput("rounded", sides, ["unknown"]);

  shouldEvaluateTheCorrectPatternTest(pattern, { shouldMatch, shouldNotMatch });

  shouldParseCorrectlyTest(pattern, plugin, [
    ["rounded", { borderRadius: 4 }],
    ["rounded-t", { borderTopRadius: 4 } as any], //TODO check why this typing is failing
    ["rounded-r", { borderRightRadius: 4 }],
    ["rounded-b", { borderBottomRadius: 4 }],
    ["rounded-l", { borderLeftRadius: 4 }],
    ["rounded-s", { borderStartRadius: 4 }],
    ["rounded-e", { borderEndRadius: 4 }],
    ["rounded-tl", { borderTopLeftRadius: 4 }],
    ["rounded-tr", { borderTopRightRadius: 4 }],
    ["rounded-br", { borderBottomRightRadius: 4 }],
    ["rounded-bl", { borderBottomLeftRadius: 4 }],
    ["rounded-md", { borderRadius: 6 }],
    ["rounded-t-md", { borderTopRadius: 6 } as any], //TODO check why this typing is failing
    ["rounded-r-md", { borderRightRadius: 6 }],
    ["rounded-b-md", { borderBottomRadius: 6 }],
    ["rounded-l-md", { borderLeftRadius: 6 }],
    ["rounded-s-md", { borderStartRadius: 6 }],
    ["rounded-e-md", { borderEndRadius: 6 }],
    ["rounded-tl-md", { borderTopLeftRadius: 6 }],
    ["rounded-tr-md", { borderTopRightRadius: 6 }],
    ["rounded-br-md", { borderBottomRightRadius: 6 }],
    ["rounded-bl-md", { borderBottomLeftRadius: 6 }],
  ]);

  wrongValueTest({
    pattern,
    plugin,
    input: "rounded-r-md",
    themeReturnType: { md: "1" },
  });
});
