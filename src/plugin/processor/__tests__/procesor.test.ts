import { transform } from "babel-core";

const plugin = require("../../");
const opts = { presets: ["react-native"], plugins: [plugin] };

// TODO fix this test
it("Should compile regular style", () => {
  const input = `
    import { View } from "react-native";

    const Component = () => {
      return <View style={{ backgroundColor: "red" }} />;
    };`;

  const { code } = transform(input, opts);
  expect(code).toMatchSnapshot();
});

// it.only("Should compile breeze background color", () => {
//   const input = `
//   import { View } from "react-native";
//   import { br } from "react-native-breeze";

//   const Calendar = () => {
//     return <View style={br\`bg-red-500\`} />;
//   };`;

//   const { code } = transform(input, opts);
//   console.log({ code });
//   // expect(code).toMatchSnapshot();
// });

// it.only("Should compile breeze background color and regular styles", () => {
//   const input = `
//   import { View, Platform } from "react-native";
//   import { br } from "react-native-breeze";

//   const Calendar = () => {
//     const isWeb = Platform.OS === 'web';

//     return <View style={[br\`bg-red-500\${isWeb ? "p-1" : "p-2"}\`, { padding: 1}]} />;
//   };`;

//   const { code } = transform(input, opts);
//   console.log({ code });
//   // expect(code).toMatchSnapshot();
// });
