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
  hasBreezeHookImport,
  addUseBreezeImport,
} from "./helpers/babel";

interface State extends PluginPass {
  program: NodePath<t.Program>;
}

module.exports = (): PluginObj<State> => {
  const BreezeCallsVisitor: Visitor = {
    TaggedTemplateExpression(path) {
      if (isBreeze(path)) {
        handleBreeze(path);
      } else if (isBreezeValue(path)) {
        handleBreezeValue(path);
      } else if (isBreezeRaw(path)) {
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
        if (isBreezeImport(path) && !hasBreezeHookImport(path)) {
          addUseBreezeImport(state.program);
        }
      },
    },
  };
};
