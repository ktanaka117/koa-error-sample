
const error = require('./lib/error')
const jsonError = require('./middleware/json_error')

const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

router
  .get('/lack_of_params', () => {
		// errorで定義されているLackOfParamsError
    throw new error.LackOfParamsError()
	})
	.get('/invalid_params', () => {
		// throwする箇所に応じてdisplay_messageを変更したい場合は引数に渡す
		throw new error.InvalidParamsError('不正な入力項目です。入力可能文字を確認の上、再度ボタンを押してください。')
	})
	.get('/unexpected', () => {
		// その他のエラーはUnexpectedErrorとして扱われる
		throw new Error()
	})

app
	.use(jsonError)
	.use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(3000)