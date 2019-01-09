import { Success, Failure } from 'lib/Response'
import bot from 'lib/Line'

function linkDefaultRichMenu({ replyToken, source: { userId } }) {
  return bot.linkRichMenu(userId, process.env.DEFAULT_RICH_MENU)
}

async function eventHandler(event) {
  await bot.load(event)
  switch(event.type) {
    case 'follow':
      return linkDefaultRichMenu(event)

    case 'message':
      return bot.replyByTextMap('SUCCESS')

    case 'postback':
      return bot.replyByTextMap('SUCCESS')

    default:
      return bot.replyByTextMap('ERROR')
  }
}

export async function handler(event) {
  const signature = event.headers['X-Line-Signature']
  const body = event.body
  const { events } = JSON.parse(body)
  try {
    if (bot.isValidRequest(body, signature) && events) {
      await Promise.all(events.map(eventHandler))
      return Success()
    } else {
      return Failure('BadRequest')
    }
  } catch (error) {
    return Failure(error)
  }
}
