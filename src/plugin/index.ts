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
  generatePlatformStylesHook,
  hasMergeStylesImport,
  addMergeStylesImport,
} from "./helpers/babel";
import babel from "babel-core";
import { Scope, NodePath } from "@babel/traverse";
import { pattern } from "./plugins/alignContent";

const CreateStyleSheetVisitor: Visitor<any> = {
  Program(path) {
    // console.log("PROGRAM");
  },
  Function(path) {
    // console.log("FUNCTION");
  },
  enter(path) {
    console.log(path.node.type);
  },
};

module.exports = (): PluginObj => {
  return {
    name: "react-native-breeze",
    visitor: {
      Program(path, state) {
        state.program = path;
      },
      ImportDeclaration(path, state) {
        const { node } = path;

        if (!hasMergeStylesImport(node)) {
          addMergeStylesImport(path as any);
        }
      },
      TaggedTemplateExpression(path, state) {
        const { node, scope, parent } = path;
        const { program } = state;

        if (!isBreezeIdentifier(node)) return;

        const styles = getSylesFromTaggedTemplateNode(node);

        const platformStylesIdentifier = generatePlatformStylesHook(
          scope as any,
          styles
        );

        // Importing the React Stylesheet
        // if (!state.hasStylesheetImport) {
        //   importReactNativeStylesheet(program);
        //   state.hasStylesheetImport = true;
        // }

        // const idenfitiers = createStyleSheetForStyle(
        //   scope as any,
        //   state.program,
        //   styles
        // );

        // console.log({ stylesheetIdentifier });

        // path.scope.path.addComment('TESt');

        // path.scope.path.traverse(CreateStyleSheetVisitor, { styles: "STYLE" });
        //.traverse(CreateStyleSheetVisitor, { styles: "STYLE" })

        // console.log({ state });

        // path.parentPath.traverse(CreateStyleSheetVisitor, { styles: "STYLE" });
        (path as any).replaceWith(
          template.expression(
            `{...${platformStylesIdentifier.name}.base.all}`
          )()
        );
        // path.replaceWithSourceString(`...${platformStylesIdentifier.name}`);
        // path.replaceWithSourceString(`{ color: 'red' }`);
      },
    },
  };
};
