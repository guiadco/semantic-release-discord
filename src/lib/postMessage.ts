import fetch from 'node-fetch';
import SemanticReleaseError from '@semantic-release/error';

module.exports = async (
  message,
  logger,
  { discordWebhook, discordToken, discordChannel, discordIcon, discordUsername }
) => {
  let response
  let bodyText
  let isSuccess
  try {
    // if (discordIcon) {
    //   const hasSemicolons = discordIcon.startsWith(':') && discordIcon.endsWith(':')
    //   message['icon_emoji'] = hasSemicolons ? discordIcon : `:${discordIcon}:`
    // }

    if (discordUsername) {
      message.username = discordUsername
    }

    // if (discordToken && discordChannel) {
    //   message.channel = discordChannel
    //   response = await fetch('https://discord.com/api/chat.postMessage', {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //       Authorization: `Bearer ${discordToken}`
    //     },
    //     body: JSON.stringify(message)
    //   })
    //   bodyText = await response.text()
    //   isSuccess = response.ok && JSON.parse(bodyText).ok
    // } else {
      if (discordChannel) {
        message.channel = discordChannel
      }
      response = await fetch(discordWebhook, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })
      bodyText = await response.text()
      isSuccess = response.ok && bodyText === 'ok'
    // }
  } catch (e) {
    throw new SemanticReleaseError(e.message, 'DISCORD CONNECTION FAILED')
  }

  if (!isSuccess) {
    logger.log('JSON message format invalid: ' + bodyText)
    throw new SemanticReleaseError(bodyText, 'INVALID DISCORD COMMAND')
  }
}
