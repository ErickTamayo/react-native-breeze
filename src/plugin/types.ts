export type Configuration = {
  theme: {
    [key: string]: any;
  };
  variants: {
    [key: string]: any;
  };
  corePlugins: {
    [key: string]: boolean;
  };
  plugins: string[];
};
