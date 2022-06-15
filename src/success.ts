import SemanticReleaseError from "@semantic-release/error";
import { getDiscordVars } from "./lib/getDiscordVars";

export async function success(context) {
  const { logger } = context;
  const { discordWebhook, discordWebhookEnVar, discordUsername, discordUsernameEnVar } = getDiscordVars();
}
