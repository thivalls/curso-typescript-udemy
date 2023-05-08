import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new EncrypterStub()
}

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encrypSpy).toHaveBeenCalledWith(accountData.password)
  })

  // test('Should return 500 if Encrypter throws', async () => {
  //   const { sut, encrypterStub } = makeSut()

  //   jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
  //     return await new Promise((resolve, reject) => { reject(new Error()) })
  //   })
  //   const accountData = {
  //     name: 'valid_name',
  //     email: 'valid_email@mail.com',
  //     password: 'valid_password'
  //   }

  //   const sutResponse = await sut.add(accountData)

  //   expect(sutResponse.statusCode).toBe(500)
  //   expect(sutResponse.body).toEqual(new ServerError())
  // })
})
