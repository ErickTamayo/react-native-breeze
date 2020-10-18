import { transform, TransformOptions } from "babel-core";

const plugin = require("../");
const opts: TransformOptions = {
  presets: ["react-native"],
  plugins: [plugin],
  compact: false,
};

describe("react-native-breeze plugin", () => {
  it("Should compile regular style", () => {
    const input = `
    import { View } from "react-native";

    const Component = () => {
      return <View style={{ backgroundColor: "red" }} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });

  it.only("Should compile breeze background color", () => {
    const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {
      return <View style={br\`bg-red-500\`} />;
    };`;

    const { code } = transform(input, opts);
    expect(code).toMatchSnapshot();
  });
});
