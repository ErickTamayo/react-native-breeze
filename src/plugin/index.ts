import * as t from "@babel/types";
import { processStyles } from "./processor";
import { PluginObj } from "babel-core";
import {
  isBreezeIdentifier,
  getSylesFromTaggedTemplateNode,
  isBreezeImport,
} from "./helpers/babel";

module.exports = ({ types }: any): PluginObj => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (isBreezeImport(node)) {
          path.remove();
        }
      },
      TaggedTemplateExpression(path, state) {
        const { node, parent } = path;

        if (!isBreezeIdentifier(node)) return;

        const styles = getSylesFromTaggedTemplateNode(node);

        processStyles(path, styles);
      },
    },
  };
};
