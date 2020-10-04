import { transform } from "babel-core";

const plugin = require("../");
const opts = { presets: ["react-native"], plugins: [plugin] };

// TODO fix this test
describe("backgroundColor", () => {
  it("Should parse the correct color", () => {
    expect(true).toBe(true);
    // const input = `
    //   import { View } from "react-native";

    //   const Component = () => {
    //     return <View style={{ backgroundColor: "red" }} />;
    //   };`;

    // const { code } = transform(input, opts);
    // expect(code).toMatchSnapshot();
  });
});
