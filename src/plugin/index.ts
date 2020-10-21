import * as t from "@babel/types";
import template from "@babel/template";
import { PluginObj, Visitor } from "babel-core";
import {
  isBreezeIdentifier,
  getSylesFromTaggedTemplateNode,
  isBreezeImport,
  isStyleSheetIsImported,
  importReactNativeStylesheet,
  createStyleSheetForStyle,
  addBreezeHook,
  hasBreezeHookImport,
  addUseBreezeImport,
  addForceResetComment,
  hasFocusStyles,
  hasHoverStyles,
  addHoverPropsToJSX,
} from "./helpers/babel";
import babel from "babel-core";
import { Scope, NodePath } from "@babel/traverse";
import { pattern } from "./plugins/alignContent";

module.exports = (): PluginObj => {
  const BreezeCallsVisitor: Visitor = {
    TaggedTemplateExpression(path) {
      const { node } = path;
      if (!isBreezeIdentifier(node)) return;

      const styles = getSylesFromTaggedTemplateNode(node);

      const identifier = addBreezeHook(path as any, styles);

      (path as any).replaceWith(
        template.expression(`${identifier.name}.style`)()
      );

      const JSXParent = path.findParent((path) => path.isJSXOpeningElement());

      // If is a JSX parent, add the hover and focus handlers if style have focus or hover
      if (JSXParent) {
        if (hasFocusStyles(node)) {
          //
        }

        if (hasHoverStyles(node)) {
          addHoverPropsToJSX(identifier, JSXParent as any);
        }

        return;
      }

      // If is a variable declaration, find the JSX bindings to assing to them
      const variableDeclaration = path.findParent((path) =>
        path.isVariableDeclaration()
      );

      if (variableDeclaration) {
        // TODO: traverse the parent scope to find JSX that references to a variable
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
        const { node } = path;

        if (isBreezeImport(node) && !hasBreezeHookImport(node)) {
          addUseBreezeImport(state.program);
        }
      },
    },
  };
};
