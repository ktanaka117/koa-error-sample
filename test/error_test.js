'use strict'

const assert = require('chai').assert
const supertest = require('supertest')
const server = require('../server')

let testServer
let request

describe('error_test', () => {
  before(() => {
    testServer = server.listen()
    request = supertest(testServer)
	})
		
	context('GET /lack_of_paramsにアクセスした場合', () =>{
		it('LackOfParamsErrorが返却されること', async () => {
			const res = await request
				.get(`/lack_of_params`)

			assert.equal(res.status, 400)
			assert.equal(res.body.error, 'LackOfParamsError')
			assert.equal(res.body.message, '必須パラメータが不足しています。リクエストに含まれるパラメータを確認してください。')
			assert.equal(res.body.display_message, '必須入力項目が空です。必須入力項目を埋めて、再度ボタンを押してください。')
		})
	})

	context('GET /invalid_paramsにアクセスした場合', () => {
		it('InvalidParamsErrorが返却されること', async () => {
			const res = await request
				.get(`/invalid_params`)

			assert.equal(res.status, 400)
			assert.equal(res.body.error, 'InvalidParamsError')
			assert.equal(res.body.message, '指定されたパラメータが正しくありません。リクエストに含まれるパラメータを確認してください。')
			assert.equal(res.body.display_message, '不正な入力項目です。入力可能文字を確認の上、再度ボタンを押してください。')
		})
	})

	context('GET /unexpected_testにアクセスした場合', () => {
		it('UnexpectedErrorが返却されること', async () => {
			const res = await request
				.get(`/unexpected`)

			assert.equal(res.status, 500)
			assert.equal(res.body.error, 'UnexpectedError')
			assert.equal(res.body.message, 'Internal Server Error')
			assert.equal(res.body.display_message, 'システムエラーです。時間をおいて再度試しください。')
		})
	})

	after((done) => {
		testServer.close()
    done()
	})
})