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
} from "./helpers/babel";
import babel from "babel-core";
import { Scope, NodePath } from "@babel/traverse";
import { pattern } from "./plugins/alignContent";

module.exports = (): PluginObj => {
  let hookIdentifiers = new WeakMap<
    any,
    {
      identifier: t.Identifier;
      path: any;
    }
  >();

  const BreezeCallsVisitor: Visitor = {
    TaggedTemplateExpression(path, state) {
      const { node, scope } = path;
      if (!isBreezeIdentifier(node)) return;

      const fnScope = path.scope.getFunctionParent();

      const identifier = addBreezeHook(
        fnScope as any,
        getSylesFromTaggedTemplateNode(node)
      );

      (path as any).replaceWith(
        template.expression(`${identifier.name}.styles.base.all`)()
      );

      // hookIdentifiers.set(path, addBreezeHook(fnScope as any));

      // const identifier = addBreezeHook(fnScope as any);

      // console.log({ identifier });

      // console.log("HERE");

      // // Add random hooks
      // const count = Math.floor(Math.random() * 6) + 1;

      // const hookDeclaration = template(
      //   `const MEMOVAR = React.useMemo(() => MEMO, [])`
      // );

      // console.log({ count });

      // for (let index = 0; index < count; index++) {
      //   const memoIdentifier = scope.generateUidIdentifier("memo");

      //   const statement = hookDeclaration({
      //     MEMOVAR: memoIdentifier,
      //     MEMO: t.stringLiteral(`${index}`),
      //   });

      //   (fnScope.path.get("body") as any).unshiftContainer("body", statement);
      // }
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

        // const { program } = state;
        // if (!hasBreezeHookImport(node)) {
        //   addUseBreezeImport(program);
        // }
      },
      FunctionDeclaration(path, state) {
        path.traverse;
      },
      TaggedTemplateExpression(path, state) {
        const { node, scope, parent } = path;
        // const { program, areBreezeHooksImported } = state;

        if (!isBreezeIdentifier(node)) return;

        // const {
        //   identifier: hookIdentifier,
        //   path: hookPath,
        // } = hookIdentifiers.get(path)!;

        // console.log({ hookIdentifier, hookPath });

        // if (!areBreezeHooksImported) {
        //   addUseBreezeImport(program);
        //   state.areBreezeHooksImported = true;
        // }

        // const styles = getSylesFromTaggedTemplateNode(node);

        // const BreezeStylesIdentifier = generateBreezeStylesHook(
        //   scope as any,
        //   styles
        // );

        // (path as any).replaceWith(
        //   template.expression(
        //     `{...${BreezeStylesIdentifier.name}.base.all}`
        //   )()
        // );
      },
    },
  };
};
