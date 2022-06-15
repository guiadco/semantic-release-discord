import { config } from "./config";
import { Context } from "semantic-release";

export async function preparemessage(config: config, context: Context) {
  const { env, nextRelease, logger } = context;
  logger.log('prepare message.');
  if (!env.DISCORD_CUSTOM_MESSAGE || !config.custom_message) {
    logger.log('prepare custom message.');
    const message = {
      text: config.custom_message,
      username: config.username
    }
    return message;
  }
  else {
    logger.log('prepare default message.');
    const message = {
      text: `The ${nextRelease.type} version "${nextRelease.version}" has been released.\n\n${nextRelease.notes}`,
      username: config.username
    }
    return message;
  }
}
