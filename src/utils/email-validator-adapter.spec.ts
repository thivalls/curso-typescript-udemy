import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  test('Should return false if EmailValidator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if EmailValidator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  test('Should garantee that EmailValidator validate correct email from request', () => {
    const sut = new EmailValidatorAdapter()
    const isEmail = jest.spyOn(validator, 'isEmail')
    const validEmail = 'valid_email@email.com'
    sut.isValid(validEmail)
    expect(isEmail).toBeCalledWith(validEmail)
  })
})
