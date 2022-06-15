import SemanticReleaseError from "@semantic-release/error";
import fetch from "node-fetch";

export async function postMessageToDiscord(message, discordWebhook) {
  try {
    const response = await fetch(discordWebhook, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(message),
    })
    const { status } = response
    if (!String(status).startsWith('20')) {
      const responseContent = await response.json()
      throw new SemanticReleaseError(
        responseContent.message,
        "DISCORD CALL FAILED"
      )
    }
  } catch (error) {
    throw new SemanticReleaseError(error.message, "DISCORD CALL FAILED")
  }
}