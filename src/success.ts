import SemanticReleaseError from "@semantic-release/error";
import { getDiscordVars } from "./lib/getDiscordVars";
import { webhook } from "./lib/webhook";
import { preparemessage } from "./lib/message";

export async function success(getDiscordVars, context) {
  const { logger } = context;
  logger.log('Executing webhook.');
  // const hook = context.env.DISCORD_WEBHOOK || config.webhook;
  const removeHashMarkdowns = (text) =>
    text.replace(/\n### /g, "\n").replace(/\n## /g, "\n")
  const removeDoubleNewLines = (text) => text.replace(/\n\n/g, "\n")
  const removeFirstLine = (text) => {
    const [, ...lines] = text.split("\n")
    return lines.join("\n")
  }
  // const discordMessage = preparemessage(context);

  // await postMessageToDiscord(discordMessage, config.webhook)
}
