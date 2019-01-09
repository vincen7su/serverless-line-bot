const ERROR_CODE_MAP = {
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request'
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized'
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden'
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found'
  },
  InternalServerError: {
    statusCode: 500,
    message: 'Internal Server Error'
  },
  defaultError: {
    statusCode: 500,
    message: 'Internal Server Error'
  }
}

export function Success(body) {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}

export function Failure(error) {
  const { statusCode, message } = ERROR_CODE_MAP[error] ? ERROR_CODE_MAP[error] : ERROR_CODE_MAP.defaultError
  return { statusCode, body: JSON.stringify(message) }
}