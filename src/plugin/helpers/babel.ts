import * as t from "@babel/types";
import babel from "babel-core";
import { getStyleFromString } from "./plugins";

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
  const styles = quasis.reduce<string[]>((acc, q) => {
    if (!q.value.raw) return acc;

    const splitted = q.value.raw
      .split(" ")
      .map((v) => v.trim())
      .filter(Boolean);

    return [...acc, ...splitted];
  }, []);

  return styles;
};
