import { Config } from "./Config";
import { Context } from "semantic-release";

import { webhook } from './webhook';

import { preparemessage } from './message';

export async function success(config: Config, context: Context) {
  const { logger } = context;
  logger.log('Executing webhook.');

  const hook = context.env.DISCORD_WEBHOOK || config.webhook;
  const message = preparemessage(config, context);

  await webhook({
    hook,
    message,
    logger
  })
}
