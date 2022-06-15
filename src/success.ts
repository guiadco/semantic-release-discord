import SemanticReleaseError from "@semantic-release/error";
import { getDiscordVars } from "./lib/getDiscordVars";
import postMessage from './lib/postMessage';
import  getConfigToUse from './lib/getConfigToUse';

/* eslint-disable camelcase */
// const slackifyMarkdown = require('slackify-markdown')
// import  template = require('./template')
// import  truncate = require('./truncate')
// import  getRepoInfo = require('./getRepoInfo')

// 2900 is the limit for a message block of type 'section'.
const MAX_LENGTH = 2900

module.exports = async (context) => {
  const {
    logger,
    nextRelease,
    options,
    env: { SEMANTIC_RELEASE_PACKAGE, npm_package_name }
  } = context

  // const configToUse = getConfigToUse(pluginConfig, context)
  // const { unsafeMaxLength = MAX_LENGTH, packageName } = configToUse
  const {
    discordWebhook,
    // discordToken,
    // discordChannel,
    // discordIcon,
    discordUsername
  } = getDiscordVars;

  // const package_name =
    // SEMANTIC_RELEASE_PACKAGE || packageName || npm_package_name

  // if (!configToUse.notifyOnSuccess) {
    // logger.log('Notifying on success skipped')
    // return
  // }

  logger.log('Sending discord notification on success')

  // const repo = getRepoInfo(options.repositoryUrl)

  let releaseNotes = nextRelease.notes

  // if (configToUse.markdownReleaseNotes) {
  // Creating slack format from the markdown notes.
  //   releaseNotes = slackifyMarkdown(releaseNotes)
  // }

  // truncate long messages
  // if (unsafeMaxLength > 0) {
  //   releaseNotes = truncate(releaseNotes, unsafeMaxLength)
  // }

  let discordMessage = {}
  // Override default success message
  if (configToUse.onSuccessFunction) {
    slackMessage = configToUse.onSuccessFunction(configToUse, context)
  } else if (configToUse.onSuccessTemplate) {
    slackMessage = template(configToUse.onSuccessTemplate, {
      package_name,
      npm_package_version: nextRelease.version,
      repo_path: repo.path,
      repo_url: repo.URL,
      release_notes: releaseNotes
    })
  } else {
    let messageBlocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `A new version of \`${package_name}\` has been released!\nCurrent version is *${nextRelease.version
            }*`
        }
      }
    ]

    if (releaseNotes !== '') {
      messageBlocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${releaseNotes}`
        }
      })
    }

    slackMessage = {
      blocks: messageBlocks,
      text: `A new version of ${package_name} has been released!`
    }

    if (repo.path) {
      const gitTag = nextRelease.gitTag
      const gitTagPrefix = repo.hostname.startsWith('gitlab')
        ? '/-/releases/'
        : '/releases/tag/'
      const gitTagUrl = repo.URL + gitTagPrefix + gitTag

      slackMessage.attachments = [
        {
          color: '#2cbe4e',
          blocks: [
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `:package: *<${repo.URL}|${repo.path
                    }>:*   <${gitTagUrl}|${gitTag}>`
                }
              ]
            }
          ]
        }
      ]
    }
  }

  await postMessage(discordMessage, logger, {
    discordWebhook,
    discordChannel,
    discordToken,
    discordIcon,
    discordName
  })
}
