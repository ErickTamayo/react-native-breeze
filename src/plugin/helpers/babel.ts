// import { NodePath } from "@babel/core";
import template from "@babel/template";
import * as t from "@babel/types";
import babel from "babel-core";
import { generateStyleFromInput, PlatformStyles } from "./styles";
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
  styles: PlatformStyles
) => {
  const variants = Object.keys(styles);

  const variantIdentifiers = variants.map((v) => {
    // const platforms = Object.keys(styles[v as keyof PlatformStyles]);

    // ios?: MediaStyle;
    // android?: MediaStyle;
    // web?: MediaStyle;
    // native?: MediaStyle;
    // default?: MediaStyle;

    return scope.generateUidIdentifier(`${v}_styles`);
  });

  // const

  console.log({ variantIdentifiers });

  const stylesheetDeclaration = template(
    `const STYLESHEET = StyleSheet.create({
      
    })`
  );

  variantIdentifiers.forEach((vi) => {
    root.unshiftContainer("body", stylesheetDeclaration({ STYLESHEET: vi }));
  });
};

export const generatePlatformStylesHook = (
  scope: Scope,
  styles: PlatformStyles
) => {
  const hookDeclaration = template(
    `const PLATFORM_STYLES = React.useMemo(() => {
      const styles = STYLES;
      const isNative = Platform.OS === "android" || Platform.OS === "ios";

      const defaultStyles = styles.default;
      const osStyles = styles[Platform.OS] || {};
      const nativeStyles = isNative ? (styles.native || {}) : {};

      return mergeStyles([defaultStyles, nativeStyles, osStyles]);
    }, [])`,
    {
      placeholderPattern: false,
      placeholderWhitelist: new Set(["PLATFORM_STYLES", "STYLES"]),
    }
  );

  const styleString = JSON.stringify(styles).replace(
    /\"([^(\")"]+)\":/g,
    "$1:"
  );

  const platformStylesIdentifier = scope.generateUidIdentifier(
    "platformStyles"
  );

  const statement = hookDeclaration({
    PLATFORM_STYLES: platformStylesIdentifier,
    STYLES: template.expression(styleString)(),
  });

  console.log({ scopePath: scope.path.get("body") });

  (scope.path.get("body") as any).unshiftContainer("body", statement);

  return platformStylesIdentifier;
};

export const hasMergeStylesImport = (node: babel.types.ImportDeclaration) => {
  const { source, specifiers } = node;

  const isReactNativeImport = t.isStringLiteral(source, {
    value: "react-native-breeze",
  });

  if (isReactNativeImport) {
    return specifiers.some((specifier) => {
      const { local } = specifier;
      return t.isIdentifier(local, { name: "mergeStyles" });
    });
  }

  return false;
};

export const addMergeStylesImport = (
  path: NodePath<babel.types.ImportDeclaration>
) => {
  const program = path.scope.getProgramParent();

  const importDeclaration = template(
    `import { mergeStyles } from "react-native-breeze";`
  );

  // TODO fix typings
  (program.path as any).pushContainer("body", importDeclaration());
};
