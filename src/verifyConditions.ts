import SemanticReleaseError from "@semantic-release/error";
import { getDiscordVars } from "./lib/getDiscordVars";

export function verifyConditions(context) {
  const { options, logger } = context;
  const { discordWebhook, discordWebhookEnVar, discordUsername, discordUsernameEnVar } = getDiscordVars();

  if (!options.plugins.find(p => p === '@semantic-release/release-notes-generator'
    || p?.[0] === '@semantic-release/release-notes-generator')) {
    logger.log("The plugin @semantic-release/release-notes-generator was not found.");
    throw new SemanticReleaseError(
      'No plugin @semantic-release/release-notes-generator was found.',
      'ENOPLUGINFOUND',
      `The plugin @semantic-release/release-notes-generator must be installed`
    )
  }
  if (!discordWebhook) {
    logger.log('DISCORD_WEBHOOK has not been defined.')
    throw new SemanticReleaseError(
      'No Discord web-hook defined.',
      'ENODISCORDHOOK',
      `A Discord Webhook must be created and set in the \`${discordWebhookEnVar}\` environment variable on your CI environment.\n\n\nPlease make sure to create a Discord Webhook and to set it in the \`${discordWebhookEnVar}\` environment variable on your CI environment. Alternatively, provide \`discordWebhook\` as a configuration option.`
    )
  }
  if (!discordUsername) {
    logger.log('DISCORD_USERNAME has not been defined.')
    throw new SemanticReleaseError(
      'No Discord usernane defined.',
      'ENODISCORDUSERNAME',
      `A Discord username must be created and set in the \`${discordUsernameEnVar}\` environment variable on your CI environment.\n\n\nPlease make sure to create a Discord username and to set it in the \`${discordWebhookEnVar}\` environment variable on your CI environment. Alternatively, provide \`discordUsername\` as a configuration option.`
    )
  }
}
