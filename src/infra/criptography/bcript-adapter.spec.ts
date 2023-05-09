import { BcryptAdapter } from './bcrypt-adapter'
import bcryptjs from 'bcryptjs'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

const saltForTest = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(saltForTest)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcryptjs, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', saltForTest)
  })

  test('Should return a valid hash when is called on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })

  test('Should return 500 if BcryptAdapter throws', async () => {
    const sut = makeSut()

    jest.spyOn(sut, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
