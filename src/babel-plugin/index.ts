import * as t from "@babel/types";
import { NodePath, PluginObj, PluginPass, Visitor } from "@babel/core";
import {
  isBreeze,
  isBreezeValue,
  isBreezeRaw,
  handleBreeze,
  handleBreezeValue,
  handleBreezeRaw,
  isBreezeImport,
  hasBreezeImports,
  addBreezeImports,
} from "./helpers/babel";

interface State extends PluginPass {
  program: NodePath<t.Program>;
}

module.exports = (): PluginObj<State> => {
  const BreezeCallsVisitor: Visitor = {
    TaggedTemplateExpression(path) {
      if (isBreeze(path)) {
        // checkBrImport(path);
        handleBreeze(path);
      } else if (isBreezeValue(path)) {
        // checkBrImport(path);
        handleBreezeValue(path);
      } else if (isBreezeRaw(path)) {
        // checkBrImport(path);
        handleBreezeRaw(path);
      }
    },
  };

  return {
    name: "react-native-breeze",
    visitor: {
      Program(path, state) {
        path.traverse(BreezeCallsVisitor);
        state.program = path;
      },
      ImportDeclaration(path, state) {
        if (isBreezeImport(path) && !hasBreezeImports(path)) {
          addBreezeImports(state.program);
        }
      },
    },
  };
};
