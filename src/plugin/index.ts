import * as t from "@babel/types";
import { processStyles } from "./processor";
import { PluginObj } from "babel-core";

module.exports = ({ types }: any): PluginObj => {
  return {
    visitor: {
      // Remove the breeze import declaration
      ImportDeclaration(path) {
        const opts = { value: "react-native-breeze" };
        if (t.isStringLiteral(path.node.source, opts)) {
          path.remove();
        }
      },
      TaggedTemplateExpression(path, state) {
        const { node, parent } = path;
        if (!t.isIdentifier(node.tag, { name: "br" })) return;

        const { quasi } = node;

        // Parse the quasis
        const styles = quasi.quasis.reduce<string[]>((acc, q) => {
          if (!q.value.raw) return acc;

          const splitted = q.value.raw
            .split(" ")
            .map((v) => v.trim())
            .filter(Boolean);

          return [...acc, ...splitted];
        }, []);

        processStyles(path, styles);
      },
    },
  };
};
