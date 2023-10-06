import "reflect-metadata";
import { NailyDependency, ConfigurationTool } from "@naily/core";

export * from "./decorators";
export * from "./constants/watermark.constant";

const adapter: string = new ConfigurationTool().getNailyConfigurationByJexl("web.adapter");
if (typeof adapter !== "string") throw new Error("The web.adapter must be a string.");
NailyDependency.addDependencyByRelativePath(adapter).save("Web包扫描完成");
