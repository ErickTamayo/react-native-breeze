import { transform, TransformOptions } from "babel-core";

const plugin = require("../");
const opts: TransformOptions = {
  presets: ["react-native"],
  plugins: [plugin],
  compact: false,
};

describe("react-native-breeze plugin", () => {
  describe("br", () => {
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

    it("should apply hover if there is a prop already correctly", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {

      const handleOnMouseEnter = () => {};
      const handleOnMouseLeave = () => {};

      return <View style={br\`hover:bg-red-500\`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply hover if there is an spread and a prop already correctly", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {

      const handleOnMouseEnter = () => {};
      const handleOnMouseLeave = () => {};

      return <View style={br\`hover:bg-red-500\`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} {...props} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply hover handlers to spread proactively", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {
      return <View style={br\`hover:bg-red-500\`} {...props} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply hover handlers to mutiple spread proactively", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {

      const otherProps = {};

      return <View style={br\`hover:bg-red-500\`} {...props} {...otherProps}/>;
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

    it("should apply focus correctly", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {
      return <View style={br\`focus:bg-red-500\`} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply focus if there is a prop already correctly", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = () => {

      const handleOnFocus = () => {};
      const handleOnBlur = () => {};

      return <View style={br\`focus:bg-red-500\`} onFocus={handleOnFocus} onBlur={handleOnBlur} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply focus if there is an spread and a prop already correctly", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {

      const handleOnFocus = () => {};
      const handleOnBlur = () => {};

      return <View style={br\`focus:bg-red-500\`} onFocus={handleOnFocus} onBlur={handleOnBlur} {...props} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply focus handlers to spread proactively", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {
      return <View style={br\`focus:bg-red-500\`} {...props} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should apply focus handlers to mutiple spread proactively", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";
  
    const Calendar = (props) => {

      const otherProps = {};

      return <View style={br\`focus:bg-red-500\`} {...props} {...otherProps}/>;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it("should not apply focus if var is not binded to a JSX", () => {
      const input = `
    import { View } from "react-native";
    import { br } from "react-native-breeze";

    const Calendar = () => {
      const noBind = br\`focus:bg-red-500\`
      return <View style={{}} />;
    };`;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });

    it.todo("should apply focus if a var is binded to a JSX");
  });

  describe("br.value", () => {
    it("should compile value correctly", () => {
      const input = `
      import { br } from "react-native-breeze";
      const value = br.value\`bg-red-500\`
    `;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });
  });

  describe("br.raw", () => {
    it("should compile value correctly", () => {
      const input = `
      import { br } from "react-native-breeze";
      const raw = br.raw\`bg-red-500\`
    `;

      const { code } = transform(input, opts);
      expect(code).toMatchSnapshot();
    });
  });
});
