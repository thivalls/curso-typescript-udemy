import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badResponse, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | Error | any {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badResponse(new MissingParamError(field))
        }
      }
      const { email, password, confirmation } = httpRequest.body
      if (password !== confirmation) {
        return badResponse(new InvalidParamError('confirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badResponse(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
