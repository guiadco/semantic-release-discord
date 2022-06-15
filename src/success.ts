import SemanticReleaseError from "@semantic-release/error";
import { getDiscordVars } from "./lib/getDiscordVars";
// import { postMessage } from "./lib/postMessage";
import { getConfigToUse } from "./lib/getConfigToUse";
import { repositoryUrl } from "./lib/getRepoInfo";

export async function success(context) {
  const { logger } = context;

  const { discordWebhook, discordWebhookEnVar, discordUsername, discordUsernameEnVar } = getDiscordVars();
  const foo = getConfigToUse;
  const bar = repositoryUrl;

}
