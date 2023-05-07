import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badResponse = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const created = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
