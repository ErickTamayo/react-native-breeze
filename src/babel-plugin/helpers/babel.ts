import template from "@babel/template";
import * as t from "@babel/types";
import { NodePath, Visitor } from "@babel/traverse";
import babel from "@babel/core";
import { generateStyleFromInput, BreezeStyle } from "../../helpers/styles";
import { toJson } from "../../helpers/objects";

export const isBreezeImport = (path: NodePath<t.ImportDeclaration>) => {
  const opts = { value: "react-native-breeze" };
  return t.isStringLiteral(path.node.source, opts);
};

export const isBreeze = (path: NodePath<t.TaggedTemplateExpression>) => {
  return t.isIdentifier(path.node.tag, { name: "br" });
};

export const isBreezeValue = (
  path: NodePath<babel.types.TaggedTemplateExpression>
) => {
  const tag = (path.node.tag as any) as t.MemberExpression;

  return (
    t.isMemberExpression(tag) &&
    t.isIdentifier(tag.object, { name: "br" }) &&
    t.isIdentifier(tag.property, { name: "value" })
  );
};

export const isBreezeRaw = (
  path: NodePath<babel.types.TaggedTemplateExpression>
) => {
  const tag = (path.node.tag as any) as t.MemberExpression;

  return (
    t.isMemberExpression(tag) &&
    t.isIdentifier(tag.object, { name: "br" }) &&
    t.isIdentifier(tag.property, { name: "raw" })
  );
};

export const isBreezeValueIdentifier = (
  node: babel.types.TaggedTemplateExpression
) => {
  return t.isIdentifier(node.tag, { name: "br" });
};

export const getSylesFromTaggedTemplateExpression = (
  path: NodePath<t.TaggedTemplateExpression>
) => {
  const {
    node: {
      quasi: { quasis, expressions },
    },
  } = path;

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

export const hasFocusStyles = (node: babel.types.TaggedTemplateExpression) => {
  const {
    quasi: { quasis },
  } = node;

  return quasis.some((q) => q.value.raw.match(/focus:/));
};

export const hasHoverStyles = (node: babel.types.TaggedTemplateExpression) => {
  const {
    quasi: { quasis },
  } = node;

  return quasis.some((q) => q.value.raw.match(/hover:/));
};

const isBuiltInHook = (hookName: string) => {
  return [
    "useState",
    "React.useState",
    "useReducer",
    "React.useReducer",
    "useEffect",
    "React.useEffect",
    "useLayoutEffect",
    "React.useLayoutEffect",
    "useMemo",
    "React.useMemo",
    "useCallback",
    "React.useCallback",
    "useRef",
    "React.useRef",
    "useContext",
    "React.useContext",
    "useImperativeMethods",
    "React.useImperativeMethods",
    "useDebugValue",
    "React.useDebugValue",
  ].includes(hookName);
};

const hookDeclaration = template(`const HOOKIDENTIFIER = useBreeze()`);

const HoistBreezeHookVisitor: Visitor<{
  identifier: t.Identifier;
  // styles: BreezeStyle;
  closestNode: t.Node | null;
}> = {
  ArrowFunctionExpression(path) {
    (path as any).arrowFunctionToExpression();
  },
  BlockStatement(path, { identifier, closestNode }) {
    const statement = hookDeclaration({
      HOOKIDENTIFIER: identifier,
      // STYLES: toJson(styles),
    });

    const closestNodeIndex = path.node.body.findIndex((n) => n === closestNode);
    path.node.body.splice(closestNodeIndex, 0, statement as any);
    path.stop();
  },
};

export const hoistBreezeHook = (
  path: NodePath<babel.types.TaggedTemplateExpression>
  // styles: BreezeStyle
) => {
  let functionParent = path.findParent((path) => path.isFunction());

  let closestNode =
    path.find((path) => {
      return path.isReturnStatement() || path.isVariableDeclaration();
    })?.node || null;

  if (!functionParent) {
    throw new Error(
      'Invalid declaration of "br" template literal: Template literal should be declared inside a Function Component'
    );
  }

  const identifier = functionParent.scope.generateUidIdentifier("breeze");

  // Check if parent is a hook, the put our hook in the next scope instead
  if (functionParent.parentPath.isCallExpression()) {
    const { callee, arguments: args } = functionParent.parentPath
      .node as t.CallExpression;

    if (isBuiltInHook((callee as t.Identifier).name)) {
      closestNode =
        functionParent.find((path) => {
          return path.isReturnStatement() || path.isVariableDeclaration();
        })?.node || null;

      functionParent = functionParent.parentPath.findParent((path) =>
        path.isFunction()
      );

      if (!functionParent) {
        throw new Error(
          'Invalid declaration of "br" template literal: Template literal should be declared inside a Function Component'
        );
      }

      // Add dependencies to the builtIn Hook
      const [, deps] = args;

      if (typeof deps === "undefined") {
        const depsExpression = template.expression("[DEPS]");
        args.push(depsExpression({ DEPS: identifier }));
      } else if (t.isArrayExpression(deps)) {
        if ((deps as t.ArrayExpression).elements.length === 0) {
          (deps as t.ArrayExpression).elements = [identifier];
        } else {
          (deps as t.ArrayExpression).elements = [
            ...(deps as t.ArrayExpression).elements,
            identifier,
          ];
        }
      }
    }
  }

  functionParent.parentPath.traverse(HoistBreezeHookVisitor, {
    identifier,
    closestNode,
  });

  return identifier;
};

export const hasBreezeImports = (path: NodePath<t.ImportDeclaration>) => {
  const {
    node: { source, specifiers },
  } = path;

  const isBreezeImport = t.isStringLiteral(source, {
    value: "react-native-breeze",
  });

  if (isBreezeImport) {
    return specifiers.some((specifier) => {
      const { local } = specifier;
      return (
        t.isIdentifier(local, { name: "useBreeze" }) ||
        t.isIdentifier(local, { name: "breezeValue" }) ||
        t.isIdentifier(local, { name: "breezeRaw" })
      );
    });
  }

  return false;
};

export const addBreezeImports = (root: NodePath<t.Program>) => {
  const importDeclaration = template(
    `import { useBreeze, breezeValue, breezeRaw } from "react-native-breeze";`
  );

  root.unshiftContainer("body", importDeclaration());
};

const getAttributeValueExpressionFromJSX = (
  JSXPath: NodePath<t.JSXOpeningElement>,
  name: string
) => {
  // Try to find the single attribute first
  const JSXAttributeWithExpression = JSXPath.node.attributes.find(
    (attribute) => {
      return (
        t.isJSXAttribute(attribute, { type: "JSXAttribute" }) &&
        t.isJSXIdentifier(attribute.name, { name }) &&
        t.isJSXExpressionContainer(attribute.value)
      );
    }
  ) as t.JSXAttribute;

  if (JSXAttributeWithExpression) {
    const expressionContainer = JSXAttributeWithExpression.value as t.JSXExpressionContainer;
    return expressionContainer.expression;
  }

  // Try to find all the spread attribute to default to them
  const JSXSpreadAttributes = JSXPath.node.attributes
    .filter((attribute) => t.isJSXSpreadAttribute(attribute))
    .reverse() as t.JSXSpreadAttribute[];

  if (JSXSpreadAttributes.length !== 0) {
    const identifiers = JSXSpreadAttributes.map(
      (a) => a.argument as t.Identifier
    );
    const whitelist = identifiers.map((_, index) => `SPREAD_${index}`);

    const substitutions = identifiers.reduce(
      (acc, identifier, index) => ({
        ...acc,
        [`SPREAD_${index}`]: {
          ...identifier,
          name: `${identifier.name}.${name}`,
        },
      }),
      {}
    );

    const expression = template.expression(whitelist.join(" || "), {
      placeholderPattern: false,
      placeholderWhitelist: new Set(whitelist),
    })(substitutions);

    return expression;
  }

  return null;
};

const filterJSXAttributesFn = (names: string[]) => (
  attribute: t.JSXAttribute | t.JSXSpreadAttribute
) => {
  if (t.isJSXAttribute(attribute, { type: "JSXAttribute" })) {
    return !names.some((name) => t.isJSXIdentifier(attribute.name, { name }));
  }
  return true;
};

export const addHoverPropsToJSX = (
  identifier: t.Identifier,
  JSXPath: NodePath<t.JSXOpeningElement>
) => {
  // TODO check for spread attributesand include it if necessary
  const previousOnMouseEnter = getAttributeValueExpressionFromJSX(
    JSXPath,
    "onMouseEnter"
  );
  const previousOnMouseLeave = getAttributeValueExpressionFromJSX(
    JSXPath,
    "onMouseLeave"
  );

  const onMouseEnter = t.jsxAttribute(
    t.jsxIdentifier("onMouseEnter"),
    t.jsxExpressionContainer(
      template.expression(`${identifier.name}.handleOnMouseEnter(PREVIOUS)`)({
        PREVIOUS: previousOnMouseEnter,
      })
    )
  );

  const onMouseLeave = t.jsxAttribute(
    t.jsxIdentifier("onMouseLeave"),
    t.jsxExpressionContainer(
      template.expression(`${identifier.name}.handleOnMouseLeave(PREVIOUS)`)({
        PREVIOUS: previousOnMouseLeave,
      })
    )
  );

  JSXPath.node.attributes = JSXPath.node.attributes.filter(
    filterJSXAttributesFn(["onMouseEnter", "onMouseLeave"])
  );

  JSXPath.node.attributes.push(onMouseEnter);
  JSXPath.node.attributes.push(onMouseLeave);
};

export const addFocusPropsToJSX = (
  identifier: t.Identifier,
  JSXPath: NodePath<t.JSXOpeningElement>
) => {
  const previousOnFocus = getAttributeValueExpressionFromJSX(
    JSXPath,
    "onFocus"
  );
  const previousOnBlur = getAttributeValueExpressionFromJSX(JSXPath, "onBlur");

  const onFocus = t.jsxAttribute(
    t.jsxIdentifier("onFocus"),
    t.jsxExpressionContainer(
      template.expression(`${identifier.name}.handleOnFocus(PREVIOUS)`)({
        PREVIOUS: previousOnFocus,
      })
    )
  );

  const onBlur = t.jsxAttribute(
    t.jsxIdentifier("onBlur"),
    t.jsxExpressionContainer(
      template.expression(`${identifier.name}.handleOnBlur(PREVIOUS)`)({
        PREVIOUS: previousOnBlur,
      })
    )
  );

  JSXPath.node.attributes = JSXPath.node.attributes.filter(
    filterJSXAttributesFn(["onFocus", "onBlur"])
  );

  JSXPath.node.attributes.push(onFocus);
  JSXPath.node.attributes.push(onBlur);
};

const breezeStatement = template.statement(`HOOKIDENTIFIER.parse(STYLES)`);

export const handleBreeze = (path: NodePath<t.TaggedTemplateExpression>) => {
  const { node } = path;

  const identifier = hoistBreezeHook(path);

  const expression = breezeStatement({
    HOOKIDENTIFIER: identifier.name,
    STYLES: node.quasi,
  });

  path.replaceWith(expression);

  const JSXParent = path.findParent((path) => path.isJSXOpeningElement());

  // If is a JSX parent, add the hover and focus handlers if style have focus or hover
  if (JSXParent) {
    if (hasFocusStyles(node)) {
      addFocusPropsToJSX(
        identifier,
        JSXParent as NodePath<t.JSXOpeningElement>
      );
    }

    if (hasHoverStyles(node)) {
      addHoverPropsToJSX(
        identifier,
        JSXParent as NodePath<t.JSXOpeningElement>
      );
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
};

const breezeValueStatement = template.statement(`breezeValue(STYLES)`);

export const handleBreezeValue = (
  path: NodePath<t.TaggedTemplateExpression>
) => {
  const expression = breezeValueStatement({ STYLES: path.node.quasi });
  path.replaceWith(expression);
};

const breezeRawStatement = template.statement(`breezeRaw(STYLES)`);

export const handleBreezeRaw = (path: NodePath<t.TaggedTemplateExpression>) => {
  const expression = breezeRawStatement({ STYLES: path.node.quasi });
  path.replaceWith(expression);
};

export const isBreezeUserConfig = (path: NodePath<t.VariableDeclarator>) => {
  return t.isIdentifier(path.node.id, { name: "__BREEZE_USER_CONFIG__" });
};

export const replaceUserConfigInit = (path: NodePath<t.VariableDeclarator>) => {
  const cwd = process.cwd();
  try {
    require.resolve(`${cwd}/breeze.config`);
    const expression = template.expression(`require("${cwd}/breeze.config")`);
    path.node.init = expression();
  } catch (error) {}
};
