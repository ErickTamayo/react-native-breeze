import fs from "fs";
import path from "path";
import merge from "deepmerge";
import get from "lodash.get";
import stealthyRequire from "stealthy-require";
import { Configuration } from "../types";
import baseConfig from "../config/breeze.config.base";
import { flattenObject } from "./objects";
import { negative, opacity } from "./misc";

const userConfigPath = path.resolve(process.cwd(), "breeze.config.js");

// type Key = Parameters<typeof get>[1];
type Path = Parameters<typeof get>[1]; //[style: string, key?: string] | string;

class Config {
  watcher: fs.FSWatcher | undefined;
  configuration: Configuration = baseConfig;
  cooldown: any;

  constructor() {
    this.loadConfiguration = this.loadConfiguration.bind(this);
    this.config = this.config.bind(this);
    this.theme = this.theme.bind(this);
    this.keys = this.keys.bind(this);
    this.color = this.color.bind(this);
    this.colorKeys = this.colorKeys.bind(this);

    const userConfigExists = fs.existsSync(userConfigPath);

    this.loadConfiguration(userConfigExists);

    if (userConfigExists) {
      this.watcher = fs.watch(userConfigPath, (event) => {
        console.log("breeze.config.js changed!");
        this.loadConfiguration(true);
      });
    }
  }

  // TODO make user config work again!
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

  config<T>(path: Path) {
    return get(this.configuration, path) as T;
  }

  theme(path: Path, defaultValue?: any) {
    const root = Array.isArray(path) ? path[0] : (path as string).split(".")[0];

    if (!root) throw new Error("Invalid path for theme");

    const themeObjectOrFunction = get(this.configuration.theme, root);

    const themeObject =
      typeof themeObjectOrFunction === "function"
        ? themeObjectOrFunction(this.theme, { negative, opacity })
        : themeObjectOrFunction;

    return get({ [root]: themeObject }, path, defaultValue);
  }

  keys(path: Path) {
    return Object.keys(this.theme(path, {}))
      .filter((key) => key !== "default")
      .map((key) => (key.startsWith("-") ? key.slice(1) : key))
      .join("|");
  }

  colorKeys(path: Path) {
    const flattened = flattenObject(this.theme(path, {}));
    return Object.keys(flattened).join("|");
  }

  color(path: Path, color: string): string {
    const flattened = flattenObject(this.theme(path, {}));
    return flattened[color];
  }
}

const instance = new Config();
Object.seal(instance);

export default instance;
