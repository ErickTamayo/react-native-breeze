import fs from "fs";
import path from "path";
import merge from "deepmerge";
import get from "lodash.get";
import stealthyRequire from "stealthy-require";
import { Configuration } from "../types";
import baseConfig from "../config/breeze.config.base";

const userConfigPath = path.resolve(process.cwd(), "breeze.config.js");

class Config {
  watcher: fs.FSWatcher | undefined;
  configuration: Configuration = baseConfig;
  cooldown: any;

  constructor() {
    const userConfigExists = fs.existsSync(userConfigPath);

    this.loadConfiguration(userConfigExists);

    if (userConfigExists) {
      this.watcher = fs.watch(userConfigPath, (event) => {
        console.log("breeze.config.js changed!");
        this.loadConfiguration(true);
      });
    }
  }

  loadConfiguration = (userConfigExists = false) => {
    const userConfig = userConfigExists
      ? stealthyRequire(require.cache, () => {
          return require(userConfigPath);
        })
      : {};

    // console.log({ userConfig: JSON.stringify(userConfig) });

    let mergedConfig = merge<Configuration>(baseConfig, userConfig);

    const { theme: baseTheme } = baseConfig;
    const { theme: userTheme = {} } = userConfig;
    const { extend: extendedTheme = {} } = userTheme;

    mergedConfig.theme = merge(
      { ...baseTheme, ...userTheme },
      extendedTheme
    ) as any;

    this.configuration = mergedConfig;
  };

  config = <T>(key: Parameters<typeof get>[1]) => {
    return get(this.configuration, key) as T;
  };

  theme = <T = unknown>(key: Parameters<typeof get>[1]) => {
    return get(this.configuration.theme, key) as T;
  };
}

const instance = new Config();
Object.seal(instance);

export default instance;
