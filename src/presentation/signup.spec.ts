import { SignUpComponent } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is passing throw body request', () => {
    const sut = new SignUpComponent()

    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        confirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
