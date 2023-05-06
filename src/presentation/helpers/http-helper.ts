import { HttpResponse } from '../protocols/http'

export const badResponse = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverResponse = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})
