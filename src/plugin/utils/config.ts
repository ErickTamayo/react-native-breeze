import fs from "fs";
import path from "path";
import merge from "deepmerge";
import get from "lodash.get";
import stealthyRequire from "stealthy-require";
import { Configuration } from "../types";
import baseConfig from "../config/breeze.config.base";
import { flattenObject } from "./objects";

const userConfigPath = path.resolve(process.cwd(), "breeze.config.js");

type Key = Parameters<typeof get>[1];
type Path = [style: string, key?: string];

class Config {
  watcher: fs.FSWatcher | undefined;
  configuration: Configuration = baseConfig;
  cooldown: any;

  constructor() {
    this.loadConfiguration = this.loadConfiguration.bind(this);
    this.config = this.config.bind(this);
    this.theme = this.theme.bind(this);
    this.keys = this.keys.bind(this);

    const userConfigExists = fs.existsSync(userConfigPath);

    this.loadConfiguration(userConfigExists);

    if (userConfigExists) {
      this.watcher = fs.watch(userConfigPath, (event) => {
        console.log("breeze.config.js changed!");
        this.loadConfiguration(true);
      });
    }
  }

  loadConfiguration(userConfigExists = false) {
    const userConfig = userConfigExists
      ? stealthyRequire(require.cache, () => {
          return require(userConfigPath);
        })
      : {};

    let mergedConfig = merge<Configuration>(baseConfig, userConfig);

    const { theme: baseTheme } = baseConfig;
    const { theme: userTheme = {} } = userConfig;
    const { extend: extendedTheme = {} } = userTheme;

    mergedConfig.theme = merge(
      { ...baseTheme, ...userTheme },
      extendedTheme
    ) as any;

    this.configuration = mergedConfig;
  }

  // loadTheme(theme: { [key: string]: any }) {
  //   this.themeConfiguration = Object.keys(theme).reduce((acc, key) => {
  //     const themeObjectOrFunction = theme[key];

  // const themeObject =
  //   typeof themeObjectOrFunction === "function"
  //     ? themeObjectOrFunction(this.theme)
  //     : themeObjectOrFunction;

  //     const flattened = flattenObject(themeObject);

  //     return { ...acc, [key]: flattened };
  //   }, {});
  // }

  config<T>(key: Key) {
    return get(this.configuration, key) as T;
  }

  theme<T>(path: Path, defaultValue?: any) {
    const [style, key] = path;

    const themeObjectOrFunction = this.configuration.theme[style];

    const themeObject =
      typeof themeObjectOrFunction === "function"
        ? themeObjectOrFunction(this.theme)
        : themeObjectOrFunction;

    const flattened = flattenObject(themeObject);

    return !key ? flattened : flattened[key] ?? defaultValue;
  }

  keys(themeKey: string, joinWith: string): string;
  keys(themeKey: string, joinWith: undefined): string[];
  keys(themeKey: string, joinWith: any) {
    const keys = Object.keys(this.theme([themeKey], {}))
      .filter((key) => key !== "default")
      .map((key) => (key.startsWith("-") ? key.slice(1) : key));

    if (joinWith) {
      return keys.join(joinWith);
    }

    return keys;
  }
}

const instance = new Config();
Object.seal(instance);

export default instance;
