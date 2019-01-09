import { Client, validateSignature } from '@line/bot-sdk'
import {
  generateButtonTemplate,
  generateConfirmTemplate,
  generateCarouselTemplate,
  generateCarouselColumn,
  generateActionPostback,
  generateActionURI,
  generateActionDatetimePicker
} from 'lib/MessageGenerator'
import ReplyTextMap from 'lib/ReplyTextMap'

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN
const channelSecret = process.env.LINE_CHANNEL_SECRET
const SOURCE_ROOM = 'room'
const SOURCE_GROUP = 'group'
const client = new Client({ channelAccessToken, channelSecret })

let event = {}

function padZero(s) {
  return ('0' + s).slice(-2)
}

function getLineDateFormat(t) {
  return t.toISOString().split('T')[0]
}

function getLineDatetimeFormat(t) {
  return t.toISOString().split(/\:(?=[^\:]+$)/)[0]
}

function replyMessage(replyToken, messages) {
  return client.replyMessage(replyToken, messages)
}

class bot {
  isValidRequest = (body, signature) => {
    return validateSignature(body, channelSecret, signature)
  }

  load = ({ replyToken, source }) => {
    const { userId, type: sourceType } = source
    const isSourceRoom = sourceType === SOURCE_ROOM
    const isSourceGroup = sourceType === SOURCE_GROUP
    const isGroupChat = isSourceRoom || isSourceGroup
    event = {
      userId,
      replyToken,
      sourceType,
      isGroupChat
    }

    if (isSourceRoom) {
      event.chatId = source.roomId
    }
    if (isSourceGroup) {
      event.chatId = source.groupId
    }
    return event
  }

  replyText = data => {
    data = (data.constructor === Array) ? data.map(text => ({ type: 'text', text })) : { type: 'text', text: data }
    return replyMessage(event.replyToken, data)
  }

  replyByTextMap = (key, ...data) => {
    let message = (typeof ReplyTextMap[key] !== 'function') ? ReplyTextMap[key] : ReplyTextMap[key](...data)
    return this.replyText(message)
  }

  linkRichMenu = (userId, richMenuId) => {
    return client.linkRichMenuToUser(userId, richMenuId)
  }

  unlinkRichMenu = (userId, richMenuId) => {
    return client.unlinkRichMenuFromUser(userId, richMenuId)
  }

  getRichMenuList = () => {
    return client.getRichMenuList()
  }

  createRichMenu = () => {
    return client.createRichMenu({
      "size": {
        "width": 2500,
        "height": 1686
      },
      "selected": true,
      "name": "chatbot rich menu",
      "chatBarText": "▲chatbot rich menu▲",
      "areas": [
        {
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 2500,
            "height": 1686
          },
          "action": {
            label: 'Hi!',
            type: 'postback',
            data: 'TEST',
            displayText: 'Hi!'
          }
        }
      ]
    })
  }

  deleteRichMenu = richMenuId => {
    return client.deleteRichMenu(richMenuId)
  }

  setRichMenuImage = (richMenuId, imgData) => {
    return client.setRichMenuImage(richMenuId, imgData)
  }
}

export default new bot()
