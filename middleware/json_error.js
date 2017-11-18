'use strict'

module.exports = async (ctx, next) => {
	await next()
		.catch((err) => {
			if (err.type === 'CustomError') {
        ctx.status = err.status
        ctx.body = generateCustomErrorBody(err)
        return
			}

			ctx.status = 500
      ctx.body = {
				error: 'UnexpectedError',
        message: `Internal Server Error`,
        display_message: 'システムエラーです。時間をおいて再度試しください。'
      }
		})
}

const generateCustomErrorBody = (err) => {
  let body = null

  switch (err.constructor.name) {
		case 'LackOfParamsError':
			body = {
				error: 'LackOfParamsError',
				message: '必須パラメータが不足しています。リクエストに含まれるパラメータを確認してください。',
				display_message: '必須入力項目が空です。必須入力項目を埋めて、再度ボタンを押してください。'
			}
			break

		case 'InvalidParamsError':
			body = {
				error: 'InvalidParamsError',
				message: '指定されたパラメータが正しくありません。リクエストに含まれるパラメータを確認してください。',
				display_message: err.displayMessage
			}
			break

    default:
      body = {
				error: 'UnexpectedError',
        message: err.message
      }
  }

  return body
}