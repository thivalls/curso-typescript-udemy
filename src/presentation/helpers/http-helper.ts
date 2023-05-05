import { HttpResponse } from '../protocols/http'

export const badResponse = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
