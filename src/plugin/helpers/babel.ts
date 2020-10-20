// import { NodePath } from "@babel/core";
import template from "@babel/template";
import * as t from "@babel/types";
import babel from "babel-core";
import { generateStyleFromInput, BreezeStyle } from "./styles";
import { Scope, NodePath } from "@babel/traverse";

export const isBreezeImport = (node: babel.types.ImportDeclaration) => {
  const opts = { value: "react-native-breeze" };
  return t.isStringLiteral(node.source, opts);
};

export const isBreezeIdentifier = (
  node: babel.types.TaggedTemplateExpression
) => {
  return t.isIdentifier(node.tag, { name: "br" });
};

export const getSylesFromTaggedTemplateNode = (
  node: babel.types.TaggedTemplateExpression
) => {
  const {
    quasi: { quasis },
  } = node;

  // Parse the quasis
  const input = quasis
    .reduce<string[]>((acc, q) => {
      if (!q.value.raw) return acc;

      const splitted = q.value.raw
        .split(" ")
        .map((v) => v.trim())
        .filter(Boolean);

      return [...acc, ...splitted];
    }, [])
    .join(" ");

  return generateStyleFromInput(input);
};

export const isStyleSheetIsImported = (node: babel.types.ImportDeclaration) => {
  const { source, specifiers } = node;

  const isReactNativeImport = t.isStringLiteral(source, {
    value: "react-native",
  });

  if (isReactNativeImport) {
    return specifiers.some((specifier) => {
      const { local } = specifier;
      return t.isIdentifier(local, { name: "Stylesheet" });
    });
  }

  return false;
};

export const importReactNativeStylesheet = (root: NodePath<t.Program>) => {
  const importDeclaration = template(
    `import { StyleSheet } from "react-native";`
  );
  root.unshiftContainer("body", importDeclaration());
};

export const createStyleSheetForStyle = (
  scope: Scope,
  root: NodePath<t.Program>,
  styles: BreezeStyle
) => {
  const variants = Object.keys(styles);

  const variantIdentifiers = variants.map((v) => {
    // const platforms = Object.keys(styles[v as keyof BreezeStyle]);

    // ios?: MediaStyle;
    // android?: MediaStyle;
    // web?: MediaStyle;
    // native?: MediaStyle;
    // default?: MediaStyle;

    return scope.generateUidIdentifier(`${v}_styles`);
  });

  // const

  // console.log({ variantIdentifiers });

  const stylesheetDeclaration = template(
    `const STYLESHEET = StyleSheet.create({
      
    })`
  );

  variantIdentifiers.forEach((vi) => {
    root.unshiftContainer("body", stylesheetDeclaration({ STYLESHEET: vi }));
  });
};

export const addBreezeHook = (scope: Scope, styles: BreezeStyle) => {
  const hookDeclaration = template(`const HOOKIDENTIFIER = useBreeze(STYLES)`);

  const styleString = JSON.stringify(styles).replace(
    /\"([^(\")"]+)\":/g,
    "$1:"
  );

  const identifier = scope.generateUidIdentifier("hook");

  const statement = hookDeclaration({
    HOOKIDENTIFIER: identifier,
    STYLES: styleString,
  });

  (scope.path.get("body") as any).unshiftContainer("body", statement);

  return identifier;
};

export const hasBreezeHookImport = (node: babel.types.ImportDeclaration) => {
  const { source, specifiers } = node;

  const isBreezeImport = t.isStringLiteral(source, {
    value: "react-native-breeze",
  });

  if (isBreezeImport) {
    return specifiers.some((specifier) => {
      const { local } = specifier;
      return t.isIdentifier(local, { name: "useBreeze" });
    });
  }

  return false;
};

export const addUseBreezeImport = (root: NodePath<t.Program>) => {
  const importDeclaration = template(
    `import { useBreeze } from "react-native-breeze";`
  );

  // console.log({ root });

  root.unshiftContainer("body", importDeclaration());
};

export const addForceResetComment = (path: NodePath) => {
  const file = (path as any).hub.file as t.File;

  if (!file.comments?.find(({ value }) => value === "@refresh reset")) {
    file.comments?.push({
      type: "CommentLine",
      value: "@refresh reset",
    } as any);
  }
};
