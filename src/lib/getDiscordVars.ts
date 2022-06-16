export function getDiscordVars() {
  const discordWebhookEnVar = process.env['DISCORD_WEBHOOK']
  const discordWebhook = String;
  const discordUsernameEnVar = process.env['DISCORD_USERNAME']
  const discordUsername = String;
  const discordChannelEnVar = process.env['DISCORD_CHANNEL']
  const discordChannel = String;
   return {
     discordWebhookEnVar,
     discordWebhook,
     discordUsernameEnVar,
     discordUsername,
     discordChannelEnVar,
     discordChannel,
   }
}
