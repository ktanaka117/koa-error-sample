'use strict'

class CustomError extends Error {
  constructor (displayMessage = null) {
    super()
    this.status = 400
    this.displayMessage = displayMessage
    this.type = 'CustomError'
  }
}

class LackOfParamsError extends CustomError {}
class InvalidParamsError extends CustomError {}

class UnexpectedError extends Error {
  constructor (message) {
    super()
    this.status = 500
		this.message = message
  }
}

const errors = {
	LackOfParamsError: LackOfParamsError,
	InvalidParamsError: InvalidParamsError,
  UnespectedError: UnexpectedError
}

module.exports = errors
