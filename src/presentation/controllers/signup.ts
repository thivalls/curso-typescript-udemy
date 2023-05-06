import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badResponse, serverResponse } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator){
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
  
      if(!this.emailValidator.isValid(httpRequest.body.email)) {
        return badResponse(new InvalidParamError("email"))
      }
    } catch (error) {
      return serverResponse(new ServerError())
    }
  }
}
