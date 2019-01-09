function randomReply(textArray) {
  return textArray[Math.floor((Math.random() * textArray.length))]
}

export default {
  ERROR: '\uDBC0\uDC7B',

  SUCCESS() {
    return randomReply([
      'okok!\uDBC0\uDC33',
      'Copy that！\uDBC0\uDC8D'
    ])
  }
}
