import {
  SDK_PROJECT_NAME_HEADER_NAME,
  SDK_VERSION_HEADER_NAME,
} from "@guildxyz/types";
import { InvalidProjectName } from "./error";

export type GuildInit = {
  projectName: string;
};

const globals = {
  apiBaseUrl: process.env.GUILD_SDK_BASE_URL ?? "https://api.guild.xyz/v2",
  headers: {
    "Content-Type": "application/json",
    [SDK_VERSION_HEADER_NAME]: "2.0.0-rc.2",
    [SDK_PROJECT_NAME_HEADER_NAME]: "",
  },
};

const setProjectName = (projectName: string) => {
  if (typeof projectName !== "string" || projectName.length <= 0) {
    throw new InvalidProjectName();
  }

  globals.headers[SDK_PROJECT_NAME_HEADER_NAME] = projectName;
};

function initializeGuildClient({ projectName }: GuildInit) {
  setProjectName(projectName);
}

export { globals, initializeGuildClient };
