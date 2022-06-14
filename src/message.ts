import { Config } from "./Config";
import { Context } from "semantic-release";

export function preparemessage(config: Config, context: Context) {
  const { env, nextRelease, logger } = context;
  logger.log('prepare message.');
  if (!env.DISCORD_CUSTOM_MESSAGE || !config.custom_message) {
    logger.log('prepare default message.');
    const message = {
      text: `The :rocket: ${nextRelease.type} :rocket: version :tada: ${nextRelease.version} :tada: has been released.\n\n${nextRelease.notes}`,
      username: config.username
    }
    return message;
  }
  else {
    logger.log('prepare custom message.');
    const message = {
      text: `${config.custom_message}`,
      username: config.username
    }
    return message;
  }
}
