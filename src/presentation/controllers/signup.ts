import { HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badResponse } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): any {
    const requiredFields = ['name', 'email', 'password', 'confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badResponse(new MissingParamError(field))
      }
    }
  }
}
