const MAX_CAROUSEL_COLUMN_ACTIONS = 3
const MAX_CAROUSEL_COLUMNS = 10

export function generateButtonTemplate({ altText, title, text, actions }) {
  const template = {
    type: 'buttons',
    text,
    actions
  }

  if (title) {
    template.title = title
  }
  return {
    type: 'template',
    altText,
    template
  }
}

export function generateConfirmTemplate(altText, title, actions) {
  return {
    type: 'template',
    altText,
    template: {
      type: 'confirm',
      text: title,
      actions
    }
  }
}

export function generateCarouselTemplate(altText, columns, imageConfig = false) {
  if (columns === false) {
    return []
  }

  let overflowColumns = false
  if (columns.length > MAX_CAROUSEL_COLUMNS) {
    overflowColumns = columns.slice(MAX_CAROUSEL_COLUMNS)
    columns = columns.slice(0, MAX_CAROUSEL_COLUMNS)
  }
  let template = {
    type: 'template',
    altText,
    template: {
      type: 'carousel',
      columns
    }
  }

  if (imageConfig) {
    template.imageAspectRatio = imageConfig.imageAspectRatio ? imageConfig.imageAspectRatio : 'rectangle'
    template.imageSize = imageConfig.imageSize ? imageConfig.imageSize : 'cover'
  }
  return [template].concat(generateCarouselTemplate(altText, overflowColumns))
}


export function generateCarouselColumn({ title, text, actions, defaultAction = false, image = false }) {
  if (actions === false) {
    return []
  }
  let overflowActions = false
  if (actions.length > MAX_CAROUSEL_COLUMN_ACTIONS) {
    overflowActions = actions.slice(MAX_CAROUSEL_COLUMN_ACTIONS)
    actions = actions.slice(0, MAX_CAROUSEL_COLUMN_ACTIONS)

    while (overflowActions.length < MAX_CAROUSEL_COLUMN_ACTIONS) {
      overflowActions.push({
        type: 'postback',
        label: ' ',
        data: ' '
      })
    }
  }
  let column = {
    title,
    text,
    actions
  }

  if (defaultAction) {
    column.defaultAction = defaultAction
  }

  if (image) {
    column.thumbnailImageUrl = image.thumbnailImageUrl
    column.imageBackgroundColor = image.imageBackgroundColor
  }
  return [column].concat(generateCarouselColumn({ title, text, actions: overflowActions, image }))
}


/* Action Object */
export function generateActionPostback(label, data, text) {
  return {
    type: 'postback',
    label,
    data,
    displayText: text
  }
}

export function generateActionMessage(label, text) {
  return {
    type: 'message',
    label,
    text
  }
}

export function generateActionURI(label, uri) {
  return {
    type: 'uri',
    label,
    uri
  }
}

export function generateActionDatetimePicker({ label, data, mode, initial = false, max = false, min = false }) {
  let object = {
    type: 'datetimepicker',
    label,
    data,
    mode
  }

  if (initial) {
    object.initial = initial
  }
  if (max) {
    object.max = max
  }
  if (min) {
    object.min = min
  }
  return object
}
