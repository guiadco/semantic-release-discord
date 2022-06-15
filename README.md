# semantic-release-discord

semantic-release plugin to get release notifications on discord via webhooks

## Install

Add the plugin to your npm-project

### NPM

```shell
npm install @guiadco/semantic-release-discord -D
```

## Usage

Add the plugin to your semantic-release config:

```json
{
  "plugins": [
    "@semantic-release/release-notes-generator",
    [
      "@guiadco/semantic-release-discord",
      {
        "discordWebhook": "https://discord.com/api/webhooks/546546465/jdkjskljdlja-asjdhlasjkldjkl-l_j",
        "discordUsername": "semantic-release"
      }
    ]
  ]
}
```

### Environment variable

If the ```DISCORD_WEBHOOK``` environment variable is defined in your environment,
it will be used instead of the `discordWebhook` provided in the config.

If the ```DISCORD_USERNAME``` environment variable is defined in your environment,
it will be used instead of the `discordUsername` provided in the config.
