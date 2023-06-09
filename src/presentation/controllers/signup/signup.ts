import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badResponse, created, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badResponse(new MissingParamError(field))
        }
      }
      const { name, email, password, confirmation } = httpRequest.body
      if (password !== confirmation) {
        return badResponse(new InvalidParamError('confirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badResponse(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({ name, email, password })
      return created(account)
    } catch (error) {
      return serverError()
    }
  }
}
