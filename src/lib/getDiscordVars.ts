export function getDiscordVars() {
  const discordWebhookEnVar = 'DISCORD_WEBHOOK'
  const discordWebhook = process.env[discordWebhookEnVar]
  const discordUsernameEnVar = 'DISCORD_USERNAME'
  const discordUsername = process.env[discordUsernameEnVar]
  const discordChannelEnVar = 'DISCORD_CHANNEL'
  const discordChannel = process.env[discordChannelEnVar]
   return {
     discordWebhookEnVar,
     discordWebhook,
     discordUsernameEnVar,
     discordUsername,
     discordChannelEnVar,
     discordChannel
   }
}
