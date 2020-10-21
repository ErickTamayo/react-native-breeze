import { transform, TransformOptions } from "babel-core";

const plugin = require("../");
const opts: TransformOptions = {
  presets: ["react-native"],
  plugins: [plugin],
  compact: false,
};

describe("react-native-breeze plugin", () => {
  it("should compile regular style", () => {
    const input = `
    import { View } from "react-native";

    const Component = () => {
      return <View style={{ backgroundColor: "red" }} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it("should compile breeze styles", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {
      return <View style={br\`bg-red-500\`} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it("should compile both breeze and regular styles", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {
      return <View style={[br\`bg-red-500\`, { height: 10 }]} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it("should Error if br declaration is outside of a Component", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const style = br\`åbg-red-500\`

    const Calendar = () => {
      return <View style={{}} />;
    };`;

    expect(() => transform(input, opts)).toThrow();
  });

  it("should apply hover correctly", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {
      return <View style={br\`hover:bg-red-500\`} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it("should not apply hover if var is not binded to a JSX", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";

    const Calendar = () => {
      const noBind = br\`hover:bg-red-500\`
      return <View style={{}} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it.todo("should apply hover if a var is binded to a JSX");
});
